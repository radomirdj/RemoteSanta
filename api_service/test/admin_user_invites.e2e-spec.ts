import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { createToken } from './utils/tokenService';
import { EmailInUseException } from '../src/errors/emailInUseException';
import { EmailInActiveInviteException } from '../src/errors/emailInActiveInviteException';
import { InviteNotActiveException } from '../src/errors/inviteNotActiveException';

import { LedgerModule } from '../src/ledger/ledger.module';

import {
  user1,
  user2,
  user3Manager,
  admin,
  org1,
  org2,
  userInvite1,
  userInviteCompleted,
  userInviteCanceled,
  userInviteOrg2,
  userInviteImportJob1,
  userInviteSingleImportList,
} from './utils/preseededData';

import {
  expectUserInviteRsp,
  expectUserInviteDB,
} from './utils/userInviteChecks';
import {
  UserInviteStatusEnum,
  UserRoleEnum,
  UserInviteSingleImportStatusEnum,
} from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerServiceMock } from '../src/emails/__mocks__/mailer.service.mock';
import { SqsUserInvitesService } from '../src/sqs_user_invites/sqs_user_invites.service';
import { SqsUserInvitesServiceMock } from '../src/sqs_user_invites/__mock__/sqs_user_invites.service.mock';

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');
jest.mock(
  '../src/currency_rates/currency_rates_api/currency_rates_api.service',
);

export const expectOrgTransactionRsp = (responseBody, expectedValue) => {
  expect(responseBody.orgId).toEqual(expectedValue.orgId);
  expect(responseBody.type).toEqual(expectedValue.type);
  expect(responseBody.totalAmount).toEqual(expectedValue.totalAmount);
  expect(responseBody.createdAt).toBeDefined();
  if (expectedValue.event) {
    expect(responseBody.event.description).toEqual(
      expectedValue.event.description,
    );
  } else {
    expect(responseBody.event).toBeFalsy();
  }
};

describe('admin user invites', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const testStartTime = new Date();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule, LedgerModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .overrideProvider(MailerService)
      .useValue(MailerServiceMock)
      .overrideProvider(SqsUserInvitesService)
      .useValue(SqsUserInvitesServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  describe('/admin/orgs/:id/user-invites (GET)', () => {
    it('/ (GET) - get ORG USER INVITES by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);

      const rspInvites = response.body;
      expect(rspInvites.length).toEqual(3);
      expectUserInviteRsp(rspInvites[0], userInvite1);
      expectUserInviteRsp(rspInvites[1], userInviteCompleted);
      expectUserInviteRsp(rspInvites[2], userInviteCanceled);
    });

    it('/ (GET) - get ORG2 USER INVITES by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/orgs/${org2.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);
      const rspInvites = response.body;
      expect(rspInvites.length).toEqual(2);
    });

    it('/ (GET) - ADMIN user, get WRONG ORG USER INVITES', async () => {
      await request(app.getHttpServer())
        .get(`/admin/orgs/${user1.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(404);
    });

    it('/ (GET) - NON ADMIN user, get ORG USER INVITES', async () => {
      await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/ (GET) - try to get ORG USER INVITES without token', async () => {
      await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}/user-invites/`)
        .expect(401);
    });
  });

  describe('/admin/orgs/:id/user-invites (POST)', () => {
    const newUserInvite = {
      email: 'email@newinvite.com',
    };

    it('/ (POST) - create ORG USER INVITE by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org1.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send(newUserInvite)
        .expect(201);

      const inviteRsp = response.body;
      expect(inviteRsp.email).toEqual(newUserInvite.email);
      const id = inviteRsp.id;

      await expectUserInviteDB(prisma, id, {
        email: newUserInvite.email,
        status: UserInviteStatusEnum.ACTIVE,
        orgId: org1.id,
        createdById: admin.id,
        userRole: UserRoleEnum.BASIC_USER,
      });
      await prisma.userInvite.delete({ where: { id } });
    });

    it('/ (POST) - create ORG2 USER INVITE by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send(newUserInvite)
        .expect(201);

      const inviteRsp = response.body;
      expect(inviteRsp.email).toEqual(newUserInvite.email);
      const id = inviteRsp.id;

      await expectUserInviteDB(prisma, id, {
        email: newUserInvite.email,
        status: UserInviteStatusEnum.ACTIVE,
        orgId: org2.id,
        createdById: admin.id,
        userRole: UserRoleEnum.BASIC_USER,
      });
      await prisma.userInvite.delete({ where: { id } });
    });

    it('/ (POST) - create ORG2 USER MANAGER INVITE by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send({ ...newUserInvite, userRole: UserRoleEnum.USER_MANAGER })
        .expect(201);

      const inviteRsp = response.body;
      expect(inviteRsp.email).toEqual(newUserInvite.email);
      const id = inviteRsp.id;

      await expectUserInviteDB(prisma, id, {
        email: newUserInvite.email,
        status: UserInviteStatusEnum.ACTIVE,
        orgId: org2.id,
        createdById: admin.id,
        userRole: UserRoleEnum.USER_MANAGER,
      });
      await prisma.userInvite.delete({ where: { id } });
    });

    it('/ (POST) - USER_INVITE by ADMIN - invite exists', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .send({ email: userInvite1.email })
        .expect(400);
      expect(response.body.message).toEqual(
        EmailInActiveInviteException.defaultMessage,
      );
    });

    it('/ (POST) - USER_INVITE by ADMIN - user exists', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .send({ email: user1.email })
        .expect(400);
      expect(response.body.message).toEqual(EmailInUseException.defaultMessage);
    });

    it('/ (POST) - NON ADMIN, create USER_INVITE', async () => {
      await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .send(newUserInvite)
        .expect(403);
    });

    it('/ (POST) - try to create USER_INVITE', async () => {
      await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/`)
        .send(newUserInvite)
        .expect(401);
    });
  });

  describe('/admin/:id/cancel (POST)', () => {
    it('/admin/user-invites/:id/cancel (POST) - USER_INVITE by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/user-invites/${userInviteOrg2.id}/cancel`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .expect(201);

      const inviteRsp = response.body;
      const id = inviteRsp.id;

      await expectUserInviteDB(prisma, id, {
        email: userInviteOrg2.email,
        status: UserInviteStatusEnum.CANCELED,
        orgId: org2.id,
        createdById: userInviteOrg2.createdById,
        userRole: UserRoleEnum.BASIC_USER,
      });

      await prisma.userInvite.update({
        where: { id },
        data: {
          status: UserInviteStatusEnum.ACTIVE,
        },
      });
    });

    it('/:id/cancel (POST) - USER_INVITE by ADMIN, invite COMPLETED', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/user-invites/${userInviteCompleted.id}/cancel`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .send({ email: userInvite1.email })
        .expect(400);
      expect(response.body.message).toEqual(
        InviteNotActiveException.defaultMessage,
      );
    });

    it('/:id/cancel (POST) - NON ADMIN user, cancel USER_INVITE', async () => {
      await request(app.getHttpServer())
        .post(`/admin/user-invites/${userInviteOrg2.id}/cancel`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/:id/cancel (POST) - try to cancel USER_INVITE', async () => {
      await request(app.getHttpServer())
        .post(`/user-invites/${userInviteOrg2.id}/cancel`)
        .expect(401);
    });
  });

  describe('/bulk-create-jobs (POST)', () => {
    const emailList = Array.from(
      { length: 9 },
      (_, index) => `email+${index % 20}@testemail.com`,
    );
    const bulkUserInviteList = {
      emailList,
    };

    it('/bulk-create-jobs (POST) - by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/bulk-create-jobs`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .send(bulkUserInviteList)
        .expect(201);

      const userInviteImportJobId = response.body.id;
      const userInviteImportJob = await prisma.userInviteImportJob.findUnique({
        where: {
          id: userInviteImportJobId,
        },
      });
      expect(userInviteImportJob.orgId).toEqual(org2.id);
      expect(userInviteImportJob.createdById).toEqual(admin.id);
      const userInviteSingleImportList =
        await prisma.userInviteSingleImport.findMany({
          where: {
            userInviteImportJobId,
          },
        });

      expect(userInviteSingleImportList.length).toEqual(9);
      const sortedUserInviteSingleImportList = userInviteSingleImportList.sort(
        (a, b) => (a.email < b.email ? -1 : a.email > b.email ? 1 : 0),
      );
      sortedUserInviteSingleImportList.forEach(
        (userInviteSingleImport, index) => {
          expect(userInviteSingleImport.userInviteImportJobId).toEqual(
            userInviteImportJobId,
          );
          expect(userInviteSingleImport.status).toEqual(
            UserInviteSingleImportStatusEnum.PENDING,
          );

          expect(userInviteSingleImport.email).toEqual(
            `email+${index}@testemail.com`,
          );
        },
      );

      // Clean Up
      await prisma.userInviteSingleImport.deleteMany({
        where: {
          userInviteImportJobId,
        },
      });

      await prisma.userInviteImportJob.delete({
        where: {
          id: userInviteImportJobId,
        },
      });
    });

    it('/bulk-create-jobs (POST) - by NON ADMIN ERROR', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/bulk-create-jobs`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send(bulkUserInviteList)
        .expect(403);
    });
  });

  describe('/bulk-create-jobs/:id (GET)', () => {
    it('/bulk-create-jobs/:id (GET) - by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/user-invites/bulk-create-jobs/${userInviteImportJob1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .expect(200);
      expect(response.body.id).toEqual(userInviteImportJob1.id);
      expect(response.body.orgId).toEqual(org2.id);
      const singleImportList = response.body.userInviteSingleImportList.sort(
        (a, b) => (a.email < b.email ? -1 : a.email > b.email ? 1 : 0),
      );
      singleImportList.forEach((singleImport, index) => {
        expect(singleImport.email).toEqual(
          userInviteSingleImportList[index].email,
        );
        expect(singleImport.status).toEqual(
          userInviteSingleImportList[index].status,
        );
        expect(singleImport.id).toEqual(userInviteSingleImportList[index].id);
      });
    });

    it('/bulk-create-jobs/:id (GET) - by ADMIN,wrong ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/user-invites/bulk-create-jobs/${user1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .expect(404);
    });

    it('/bulk-create-jobs/:id (GET) - NON ADMIN user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/user-invites/bulk-create-jobs/${userInviteImportJob1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user2.email,
              sub: user2.cognitoSub,
            }),
        )
        .expect(403);
    });
  });

  describe('/bulk-create-jobs/:id/progress (GET)', () => {
    it('/bulk-create-jobs/:id/progress (GET) - by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(
          `/admin/user-invites/bulk-create-jobs/${userInviteImportJob1.id}/progress`,
        )
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .expect(200);
      expect(response.body.id).toEqual(userInviteImportJob1.id);
      expect(response.body.pendingCount).toEqual(2);
      expect(response.body.successCount).toEqual(1);
      expect(response.body.failCount).toEqual(2);
    });

    it('/bulk-create-jobs/:id/progress (GET) - by ADMIN,wrong ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/user-invites/bulk-create-jobs/${user1.id}/progress`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .expect(404);
    });

    it('/bulk-create-jobs/:id/progress (GET) - NON ADMIN user', async () => {
      const response = await request(app.getHttpServer())
        .get(
          `/admin/user-invites/bulk-create-jobs/${userInviteImportJob1.id}/progress`,
        )
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user2.email,
              sub: user2.cognitoSub,
            }),
        )
        .expect(403);
    });
  });
});
