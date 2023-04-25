import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  Prisma,
  UserInvite,
  UserInviteStatusEnum,
  UserRoleEnum,
} from '@prisma/client';
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
import { CompletementStepsService } from '../completement_steps/completement_steps.service';
import { AdminOrgsService } from '../admin_orgs/admin_orgs.service';
import { OrgUserSignupDto } from '../users/dtos/org-user-signup.dto';
import consts from '../utils/consts';

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
    private completementStepsService: CompletementStepsService,
  ) {}

  async findActiveInviteByCode(code: string): Promise<UserInvite | null> {
    const userInviteList = await this.prisma.userInvite.findMany({
      where: { code, status: UserInviteStatusEnum.ACTIVE },
    });
    if (!userInviteList.length) return null;
    return userInviteList[0];
  }

  async createUserSignupCore(tx, userDbData, orgId, password) {
    const dbUser = await this.usersService.createUserTransactional(tx, {
      ...userDbData,
      org: {
        connect: {
          id: orgId,
        },
      },
    });
    let userSub;
    try {
      userSub = await this.cognitoService.registerUser(
        password,
        userDbData.email,
      );
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
  }

  async signUpOrg(data: OrgUserSignupDto) {
    const userInDb = await this.usersService.findByEmail(data.email);
    if (userInDb) throw new EmailInUseException();

    const { orgName, password, ...userDbData } = data;
    const dbUserId = await this.prisma.$transaction(async (tx) => {
      const orgDb = await this.adminOrgsService.createOrg(
        tx,
        data.orgName,
        consts.usCountryId,
        0,
        0,
      );
      const [dbUser, _notUsed] = await Promise.all([
        this.createUserSignupCore(
          tx,
          {
            ...userDbData,
            userRole: UserRoleEnum.USER_MANAGER,
          },
          orgDb.id,
          password,
        ),
        this.completementStepsService.setAllStepsNotCompleted(tx, orgDb.id),
      ]);
      return dbUser.id;
    });
    return this.usersService.findById(dbUserId);
  }

  async signUp(data: CreateUserDto) {
    const { password, code, ...userDbData } = data;
    const userInvite = await this.findActiveInviteByCode(code);
    if (!userInvite) throw new NotFoundException('Active Invite Not Found');

    const userInDb = await this.usersService.findByEmail(userInvite.email);
    if (userInDb) throw new EmailInUseException();
    const dbUserId = await this.prisma.$transaction(async (tx) => {
      const dbUser = await this.createUserSignupCore(
        tx,
        {
          ...userDbData,
          email: userInvite.email,
          userRole: userInvite.userRole,
        },
        userInvite.orgId,
        password,
      );

      await tx.userInvite.update({
        where: { id: userInvite.id },
        data: {
          status: UserInviteStatusEnum.COMPLETED,
        },
      });

      await this.adminOrgsService.createTransactionOrgToEmployeeSignup(
        tx,
        userInvite.orgId,
        dbUser,
      );
      return dbUser.id;
    });

    return this.usersService.findById(dbUserId);
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
