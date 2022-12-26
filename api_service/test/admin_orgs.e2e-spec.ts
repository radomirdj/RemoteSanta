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

import { user2, admin, org1 } from './utils/preseededData';

jest.mock('../src/users/jwt-values.service');

describe('admin/orgs', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  describe('/:id (GET)', () => {
    it('/:id (GET) - get ORG details by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);
      const rspOrg = response.body;
      expect(rspOrg.name).toEqual(org1.name);
      expect(rspOrg.pointsPerMonth).toEqual(org1.pointsPerMonth);
      expect(rspOrg.userCount).toEqual(4);
      expect(rspOrg.totalPointsPerMonth).toEqual(4800);
    });

    it('/:id (GET) - NON ADMIN user, get ORG details', async () => {
      await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/:id (GET) - try to get ORGS details without token', async () => {
      await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}`)
        .expect(401);
    });
  });

  describe('/ (GET)', () => {
    it('/ (GET) - get ORGS by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/orgs/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);

      expect(response.body.length).toEqual(1);
      const rspOrg = response.body[0];
      console.log('rspOrg', rspOrg);
      expect(rspOrg.name).toEqual(org1.name);
      expect(rspOrg.pointsPerMonth).toEqual(org1.pointsPerMonth);
    });

    it('/ (GET) - NON ADMIN user, get ORGS', async () => {
      await request(app.getHttpServer())
        .get('/admin/orgs/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/ (GET) - try to get ORGS without token', async () => {
      await request(app.getHttpServer()).get('/admin/orgs/').expect(401);
    });
  });
});
