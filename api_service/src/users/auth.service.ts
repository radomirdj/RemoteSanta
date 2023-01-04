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
import { LedgerService } from '../ledger/ledger.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private cognitoService: AwsCognitoService,
    private prisma: PrismaService,
    private ledgerService: LedgerService,
  ) {}

  async signUp(data: CreateUserDto) {
    const { password: string, ...userDbData } = data;

    const userInDb = await this.usersService.findByEmail(userDbData.email);
    if (userInDb) throw new EmailInUseException();
    const dbUser = await this.prisma.$transaction(async (tx) => {
      const dbUser = await this.usersService.createUserTransactional(tx, {
        ...userDbData,
        // TODO move to orgId from Invite
        org: {
          connect: {
            id: '752e05ce-4a81-4148-87c5-30832406d48c',
          },
        },
      });
      let userSub;
      try {
        userSub = await this.cognitoService.registerUser(data);
      } catch (err) {
        throw new CognitoException(err.message);
      }
      const ledgerPromise = this.ledgerService.createUserSides(tx, dbUser.id);
      const cognitoUpdatePromise = this.usersService.setCognitoSubTransactional(
        tx,
        dbUser.id,
        userSub,
      );

      await Promise.all([ledgerPromise, cognitoUpdatePromise]);
      return dbUser;
    });

    return this.usersService.findById(dbUser.id);
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
