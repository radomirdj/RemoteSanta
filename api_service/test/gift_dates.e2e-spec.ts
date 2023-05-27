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
import { user1, user2, giftDate1, giftDate2 } from './utils/preseededData';
import { expectGiftDateRsp, expectGiftDateInDB } from './utils/giftDateChecks';

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');
jest.mock('../src/emails/woker_module_config');
jest.mock('../src/emails/emails.service');

describe('/gift-dates', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
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

  describe('/gift-dates/:id (PATCH)', () => {
    const updateDate = {
      title: 'new title',
    };

    it('/gift-dates/:id (PATCH) - update gift date name', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/gift-dates/${giftDate1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .send(updateDate)
        .expect(200);

      const id = response.body.id;
      expect(id).toEqual(giftDate1.id);
      expectGiftDateRsp(response.body, {
        ...giftDate1,
        title: updateDate.title,
      });
      await expectGiftDateInDB(
        id,
        { ...giftDate1, title: updateDate.title, userId: user1.id },
        prisma,
      );

      await prisma.giftDate.update({
        where: { id },
        data: { title: giftDate1.title },
      });
    });

    it('/gift-dates/:id (PATCH) - wrong user try to update gift date', async () => {
      await request(app.getHttpServer())
        .patch(`/gift-dates/${giftDate1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .send(updateDate)
        .expect(404);
    });

    it('/gift-dates/:id (PATCH) - try to update gift date without token', async () => {
      await request(app.getHttpServer())
        .patch(`/gift-dates/${giftDate1.id}`)
        .send(updateDate)
        .expect(401);
    });

    it('/gift-dates/:id (PATCH) - try to update gift date with bad params', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/gift-dates/${giftDate1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .send({})
        .expect(400);
      expect(response.body.message[0]).toEqual('title should not be empty');
    });
  });

  describe('/:id/change-status (POST)', () => {
    const updateStatus = {
      enabled: false,
    };

    it('/:id/change-status (POST) - update gift date status', async () => {
      const response = await request(app.getHttpServer())
        .post(`/gift-dates/${giftDate1.id}/change-status`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .send(updateStatus)
        .expect(201);

      const id = response.body.id;

      expectGiftDateRsp(response.body, {
        ...giftDate1,
        enabled: false,
      });
      await expectGiftDateInDB(
        id,
        { ...giftDate1, enabled: false, userId: user1.id },
        prisma,
      );

      await prisma.giftDate.update({
        where: { id },
        data: { enabled: true },
      });
    });

    it('/:id/change-status (POST) - wrong user try to update gift date status', async () => {
      await request(app.getHttpServer())
        .post(`/gift-dates/${giftDate1.id}/change-status`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .send(updateStatus)
        .expect(404);
    });

    it('/:id/change-status (POST) - try to update gift date status without token', async () => {
      await request(app.getHttpServer())
        .post(`/gift-dates/${giftDate1.id}/change-status`)
        .send(updateStatus)
        .expect(401);
    });

    it('/:id/change-status (POST) - try to update gift date status with bad params', async () => {
      const response = await request(app.getHttpServer())
        .post(`/gift-dates/${giftDate1.id}/change-status`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .send({})
        .expect(400);
      expect(response.body.message[0]).toEqual(
        'enabled must be a boolean value',
      );
    });
  });

  describe('/:id (GET)', () => {
    it('/:id (GET) - get gift date', async () => {
      const response = await request(app.getHttpServer())
        .get(`/gift-dates/${giftDate1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .expect(200);

      const id = response.body.id;
      expect(id).toEqual(giftDate1.id);

      expectGiftDateRsp(response.body, giftDate1);
    });

    it('/:id (GET) - wrong user try to get gift date', async () => {
      await request(app.getHttpServer())
        .get(`/gift-dates/${giftDate1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(404);
    });

    it('/:id (GET) - try to get gift date without token', async () => {
      await request(app.getHttpServer())
        .get(`/gift-dates/${giftDate1.id}`)
        .expect(401);
    });
  });

  describe('/ (GET)', () => {
    it('/ (GET) - get gift date list', async () => {
      const response = await request(app.getHttpServer())
        .get('/gift-dates/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .expect(200);
      expect(response.body.length).toEqual(4);
      const giftDateRsp1 = response.body.find(
        (giftDateRsp) => giftDateRsp.id === giftDate1.id,
      );

      expectGiftDateRsp(giftDateRsp1, giftDate1);
    });

    it('/ (GET) - user2 gets 0 gift dates', async () => {
      const response = await request(app.getHttpServer())
        .get('/gift-dates/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(200);

      expect(response.body.length).toEqual(0);
    });

    it('/ (GET) - try to get gift dates without token', async () => {
      await request(app.getHttpServer()).get('/gift-dates/').expect(401);
    });
  });
});
