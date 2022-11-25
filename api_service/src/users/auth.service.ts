import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';
import { AwsCognitoService } from './aws-cognito/aws-cognito.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private cognitoService: AwsCognitoService,
    private prisma: PrismaService,
  ) {}

  async signUp(data: CreateUserDto) {
    const { password: string, ...userDbData } = data;

    const userInDb = await this.usersService.findByEmail(userDbData.email);
    if (userInDb) throw new BadRequestException('Email in use');
    return this.prisma.$transaction(async (tx) => {
      const dbUser = await this.usersService.createUserTransactional(
        tx,
        userDbData,
      );
      const userSub = await this.cognitoService.registerUser(data);

      await this.usersService.setCognitoSubTransactional(
        tx,
        dbUser.id,
        userSub,
      );
      return dbUser;
    });
  }
}
