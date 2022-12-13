import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';
import { AwsCognitoService } from './aws-cognito/aws-cognito.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailInUseException } from '../errors/emailInUseException';
import { CognitoException } from '../errors/cognitoException';
import { LoginCredentialsWrongException } from '../errors/loginCredentialsWrongException';
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
    if (userInDb) throw new EmailInUseException();
    return this.prisma.$transaction(async (tx) => {
      const dbUser = await this.usersService.createUserTransactional(
        tx,
        userDbData,
      );
      let userSub;
      try {
        userSub = await this.cognitoService.registerUser(data);
      } catch (err) {
        throw new CognitoException(err.message);
      }

      await this.usersService.setCognitoSubTransactional(
        tx,
        dbUser.id,
        userSub,
      );
      return dbUser;
    });
  }

  async login(data: LoginUserDto) {
    let response;
    try {
      const { accessToken, sub } = await this.cognitoService.authenticateUser(
        data,
      );
      if (!sub) throw new LoginCredentialsWrongException();
      const user = await this.usersService.findBySub(sub);
      response = { accessToken, ...user };
    } catch (err) {
      throw new CognitoException(err.message);
    }
    return response;
  }
}
