import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { EmailInUseException } from '../src/errors/emailInUseException';

import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerServiceMock } from '../src/emails/__mocks__/mailer.service.mock';
import { createToken } from './utils/tokenService';
import {
  user1,
  org1,
  user1ActivePoints,
  user1ReservedPoints,
  userInvite1,
  userInviteCanceled,
  userInviteCompleted,
  userInviteDoubleEmail,
  userInviteOrg2,
  org2,
} from './utils/preseededData';
import { expectUserRsp, expectUserInDB } from './utils/userChecks';
import {
  UserRoleEnum,
  BalanceSideTypeEnum,
  UserInviteStatusEnum,
} from '@prisma/client';

jest.mock('../src/users/jwt-values.service');

describe('Authentication system', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .overrideProvider(MailerService)
      .useValue(MailerServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  describe('/signup (POST)', () => {
    const newUser = {
      code: userInviteOrg2.code,
      firstName: 'Peter',
      lastName: 'Pan',
      password: '123456',
      gender: 'MALE',
      birthDate: new Date('2000-04-31T00:00:00.000Z'),
    };

    it('/signup (POST) - with good params', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send(newUser)
        .expect(201);

      expectUserRsp(response.body, {
        ...newUser,
        userRole: UserRoleEnum.BASIC_USER,
        email: userInviteOrg2.email,
        orgName: org2.name,
      });
      await expectUserInDB(
        {
          ...newUser,
          email: userInviteOrg2.email,
          userRole: UserRoleEnum.BASIC_USER,
        },
        prisma,
      );

      const balanceSideDBList = await prisma.balanceSide.findMany({
        where: { userId: response.body.id },
      });
      expect(balanceSideDBList.length).toEqual(2);
      const balanceSideActive = balanceSideDBList.find(
        (balanceSide) => balanceSide.type === BalanceSideTypeEnum.USER_ACTIVE,
      );
      expect(balanceSideActive).toBeDefined();
      expect(balanceSideActive.userId).toEqual(response.body.id);

      const balanceSideReserved = balanceSideDBList.find(
        (balanceSide) => balanceSide.type === BalanceSideTypeEnum.USER_RESERVED,
      );
      expect(balanceSideReserved).toBeDefined();
      expect(balanceSideReserved.userId).toEqual(response.body.id);

      await prisma.balanceSide.deleteMany({
        where: { userId: response.body.id },
      });

      const invite = await prisma.userInvite.findUnique({
        where: { id: userInviteOrg2.id },
      });
      expect(invite.status).toEqual(UserInviteStatusEnum.COMPLETED);

      await prisma.userInvite.update({
        where: { id: userInviteOrg2.id },
        data: {
          status: UserInviteStatusEnum.ACTIVE,
        },
      });
      await prisma.user.delete({ where: { email: userInviteOrg2.email } });
    });

    it('/signup (POST) - try to signup with canceled invite', async () => {
      await request(app.getHttpServer())
        .post('/users/signup')
        .send({ ...newUser, code: userInviteCanceled.code })
        .expect(404);
    });

    it('/signup (POST) - try to signup with completed invite', async () => {
      await request(app.getHttpServer())
        .post('/users/signup')
        .send({ ...newUser, code: userInviteCompleted.code })
        .expect(404);
    });

    it('/signup (POST) - try to signup existing email', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send({ ...newUser, code: userInviteDoubleEmail.code })
        .expect(400);

      expect(response.body.message).toEqual(EmailInUseException.defaultMessage);
    });
  });

  describe('/login (POST)', () => {
    it('/login (POST) - with good params', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({ email: user1.email, password: user1.password })
        .expect(201);
      expectUserRsp(response.body, {
        ...user1,
        userRole: UserRoleEnum.BASIC_USER,
        orgName: org1.name,
      });
    });
    it('/login (POST) - wrong password', async () => {
      await request(app.getHttpServer())
        .post('/users/login')
        .send({ email: user1.email, password: `a${user1.password}` })
        .expect(400);
    });
  });

  describe('/self (GET)', () => {
    it('/self (GET) - user get SELF', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/self')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .expect(200);

      expect(response.body.userBalance.pointsActive).toEqual(user1ActivePoints);
      expect(response.body.userBalance.pointsReserved).toEqual(
        user1ReservedPoints,
      );

      expectUserRsp(response.body, {
        ...user1,
        userRole: UserRoleEnum.BASIC_USER,
        orgName: org1.name,
      });
    });
  });
});
