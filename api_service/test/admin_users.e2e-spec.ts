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
import { UserRoleEnum } from '@prisma/client';
import { LedgerModule } from '../src/ledger/ledger.module';

import {
  user1,
  user2,
  user1ActivePoints,
  user1ReservedPoints,
  admin,
  org1,
} from './utils/preseededData';
import { expectUserRsp } from './utils/userChecks';

jest.mock('../src/users/jwt-values.service');

describe('admin/users', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule, LedgerModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  describe('/:id (GET)', () => {
    it('/:id (GET) - get USER1 details by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/users/${user1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
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

    it('/:id (GET) - get wrong USER details by ADMIN', async () => {
      await request(app.getHttpServer())
        .get(`/admin/users/${org1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(404);
    });

    it('/:id (GET) - NON ADMIN user, get USER details', async () => {
      await request(app.getHttpServer())
        .get(`/admin/users/${user1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/:id (GET) - try to get USER details without token', async () => {
      await request(app.getHttpServer())
        .get(`/admin/users/${user1.id}`)
        .expect(401);
    });
  });
});
