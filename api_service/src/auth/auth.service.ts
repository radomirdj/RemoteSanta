import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, UserInvite, UserInviteStatusEnum } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { AwsCognitoService } from '../users/aws-cognito/aws-cognito.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailInUseException } from '../errors/emailInUseException';
import { CognitoException } from '../errors/cognitoException';
import { LoginCredentialsWrongException } from '../errors/loginCredentialsWrongException';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { LedgerService } from '../ledger/ledger.service';
import { EmailsService } from '../emails/emails.service';
import { AdminOrgsService } from '../admin_orgs/admin_orgs.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private emailsService: EmailsService,
    private cognitoService: AwsCognitoService,
    private prisma: PrismaService,
    private ledgerService: LedgerService,
    private adminOrgsService: AdminOrgsService,
  ) {}

  async findActiveInviteByCode(code: string): Promise<UserInvite | null> {
    const userInviteList = await this.prisma.userInvite.findMany({
      where: { code, status: UserInviteStatusEnum.ACTIVE },
    });
    if (!userInviteList.length) return null;
    return userInviteList[0];
  }

  async signUp(data: CreateUserDto) {
    const { password: string, code, ...userDbData } = data;
    const userInvite = await this.findActiveInviteByCode(code);
    if (!userInvite) throw new NotFoundException('Active Invite Not Found');

    const userInDb = await this.usersService.findByEmail(userInvite.email);
    if (userInDb) throw new EmailInUseException();
    const dbUser = await this.prisma.$transaction(async (tx) => {
      const dbUser = await this.usersService.createUserTransactional(tx, {
        ...userDbData,
        email: userInvite.email,
        org: {
          connect: {
            id: userInvite.orgId,
          },
        },
      });
      let userSub;
      try {
        userSub = await this.cognitoService.registerUser(
          data,
          userInvite.email,
        );
      } catch (err) {
        throw new CognitoException(err.message);
      }
      const invitePromise = tx.userInvite.update({
        where: { id: userInvite.id },
        data: {
          status: UserInviteStatusEnum.COMPLETED,
        },
      });

      const ledgerPromise = this.ledgerService.createUserSides(tx, dbUser.id);
      const cognitoUpdatePromise = this.usersService.setCognitoSubTransactional(
        tx,
        dbUser.id,
        userSub,
      );

      await Promise.all([ledgerPromise, cognitoUpdatePromise, invitePromise]);
      await this.adminOrgsService.createTransactionOrgToEmployeeSignup(
        tx,
        userInvite.orgId,
        dbUser,
      );
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
      // await this.emailsService.sendEmail(
      //   'hi',
      //   'radomir.m.djokovic@gmail.com',
      //   user,
      // );
    } catch (err) {
      throw new CognitoException(err.message);
    }
    return response;
  }
}
