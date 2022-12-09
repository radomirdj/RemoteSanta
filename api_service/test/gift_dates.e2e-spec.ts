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
import { BirthdayAlreadyAddedException } from '../src/errors/birthdayAlreadyAddedException';
import { GiftDateTypeEnum, GiftDateRecurrenceTypeEnum } from '@prisma/client';

jest.mock('../src/users/jwt-values.service');

describe('Gift Dates', () => {
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
      const giftDate = await prisma.giftDate.findUnique({
        where: { id },
      });

      expect(response.body.type).toEqual(giftDate1.type);
      expect(response.body.recurrenceType).toEqual(giftDate1.recurrenceType);
      expect(response.body.title).toEqual(updateDate.title);
      expect(response.body.enabled).toEqual(true);

      expect(giftDate).toBeTruthy();
      expect(giftDate.type).toEqual(giftDate1.type);
      expect(giftDate.recurrenceType).toEqual(giftDate1.recurrenceType);
      expect(giftDate.title).toEqual(updateDate.title);
      expect(giftDate.enabled).toEqual(true);
      expect(giftDate.userId).toEqual(user1.id);
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
      expect(response.body.message[0]).toEqual('title must be a string');
    });
  });
});
