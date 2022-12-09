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

describe('Gift Dates - create', () => {
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

  const newGiftDate = {
    type: GiftDateTypeEnum.HOLIDAY,
    recurrenceType: GiftDateRecurrenceTypeEnum.YEARLY,
    title: 'New Year',
    //   enabled shouls be ignored
    enabled: false,
  };

  const newGiftDateBirthday = {
    type: GiftDateTypeEnum.BIRTHDAY,
    // should be ignored
    recurrenceType: GiftDateRecurrenceTypeEnum.MONTHLY,
    // should be ignored
    title: 'New Year',
    // enabled shouls be ignored
    enabled: false,
  };

  const newGiftDateBirthdayBasic = {
    type: GiftDateTypeEnum.BIRTHDAY,
  };

  const newGiftDateOther = {
    type: GiftDateTypeEnum.OTHER,
    recurrenceType: GiftDateRecurrenceTypeEnum.NONE,
    title: 'Summer Party',
  };

  it('/gift-dates (POST) - create with HOLIDAY good params', async () => {
    const response = await request(app.getHttpServer())
      .post('/gift-dates')
      .set(
        'Authorization',
        'bearer ' + createToken({ email: user2.email, sub: user2.cognitoSub }),
      )
      .send(newGiftDate)
      .expect(201);

    const id = response.body.id;
    const giftDate = await prisma.giftDate.findUnique({
      where: { id },
    });

    expect(response.body.type).toEqual(newGiftDate.type);
    expect(response.body.recurrenceType).toEqual(newGiftDate.recurrenceType);
    expect(response.body.title).toEqual(newGiftDate.title);
    expect(response.body.enabled).toEqual(true);

    expect(giftDate).toBeTruthy();
    expect(giftDate.type).toEqual(newGiftDate.type);
    expect(giftDate.recurrenceType).toEqual(newGiftDate.recurrenceType);
    expect(giftDate.title).toEqual(newGiftDate.title);
    expect(giftDate.enabled).toEqual(true);
    expect(giftDate.userId).toEqual(user2.id);

    await prisma.giftDate.delete({ where: { id } });
  });
  it('/gift-dates (POST) - create BIRTHDAY good params', async () => {
    const response = await request(app.getHttpServer())
      .post('/gift-dates')
      .set(
        'Authorization',
        'bearer ' + createToken({ email: user2.email, sub: user2.cognitoSub }),
      )
      .send(newGiftDateBirthdayBasic)
      .expect(201);

    const id = response.body.id;
    const giftDate = await prisma.giftDate.findUnique({
      where: { id },
    });

    expect(response.body.type).toEqual(newGiftDateBirthdayBasic.type);
    expect(response.body.recurrenceType).toEqual(
      GiftDateRecurrenceTypeEnum.YEARLY,
    );
    expect(response.body.title).toBeNull();
    expect(response.body.enabled).toEqual(true);

    expect(giftDate).toBeTruthy();
    expect(giftDate.type).toEqual(newGiftDateBirthdayBasic.type);
    expect(giftDate.recurrenceType).toEqual(GiftDateRecurrenceTypeEnum.YEARLY);
    expect(giftDate.title).toBeNull();
    expect(giftDate.enabled).toEqual(true);
    expect(giftDate.userId).toEqual(user2.id);

    await prisma.giftDate.delete({ where: { id } });
  });

  it('/gift-dates (POST) - create BIRTHDAY additinal params', async () => {
    const response = await request(app.getHttpServer())
      .post('/gift-dates')
      .set(
        'Authorization',
        'bearer ' + createToken({ email: user2.email, sub: user2.cognitoSub }),
      )
      .send(newGiftDateBirthday)
      .expect(201);

    const id = response.body.id;
    const giftDate = await prisma.giftDate.findUnique({
      where: { id },
    });

    expect(response.body.type).toEqual(newGiftDateBirthday.type);
    expect(response.body.recurrenceType).toEqual(
      GiftDateRecurrenceTypeEnum.YEARLY,
    );
    expect(response.body.title).toBeNull();
    expect(response.body.enabled).toEqual(true);

    expect(giftDate).toBeTruthy();
    expect(giftDate.type).toEqual(newGiftDateBirthday.type);
    expect(giftDate.recurrenceType).toEqual(GiftDateRecurrenceTypeEnum.YEARLY);
    expect(giftDate.title).toBeNull();
    expect(giftDate.enabled).toEqual(true);
    expect(giftDate.userId).toEqual(user2.id);

    await prisma.giftDate.delete({ where: { id } });
  });

  it('/gift-dates (POST) - try to create double BIRTHDAY', async () => {
    const response = await request(app.getHttpServer())
      .post('/gift-dates')
      .set(
        'Authorization',
        'bearer ' + createToken({ email: user1.email, sub: user1.cognitoSub }),
      )
      .send(newGiftDateBirthday)
      .expect(400);
    expect(response.body.message).toEqual(
      BirthdayAlreadyAddedException.defaultMessage,
    );
  });

  it('/gift-dates (POST) - create type OTHER good params', async () => {
    const response = await request(app.getHttpServer())
      .post('/gift-dates')
      .set(
        'Authorization',
        'bearer ' + createToken({ email: user2.email, sub: user2.cognitoSub }),
      )
      .send(newGiftDateOther)
      .expect(201);

    const id = response.body.id;
    const giftDate = await prisma.giftDate.findUnique({
      where: { id },
    });

    expect(response.body.type).toEqual(newGiftDateOther.type);
    expect(response.body.recurrenceType).toEqual(
      newGiftDateOther.recurrenceType,
    );
    expect(response.body.title).toEqual(newGiftDateOther.title);
    expect(response.body.enabled).toEqual(true);

    expect(giftDate).toBeTruthy();
    expect(giftDate.type).toEqual(newGiftDateOther.type);
    expect(giftDate.recurrenceType).toEqual(newGiftDateOther.recurrenceType);
    expect(giftDate.title).toEqual(newGiftDateOther.title);
    expect(giftDate.enabled).toEqual(true);
    expect(giftDate.userId).toEqual(user2.id);

    await prisma.giftDate.delete({ where: { id } });
  });

  it('/gift-dates (POST) - try to create bad type', async () => {
    const response = await request(app.getHttpServer())
      .post('/gift-dates')
      .set(
        'Authorization',
        'bearer ' + createToken({ email: user2.email, sub: user2.cognitoSub }),
      )
      .send({ ...newGiftDateOther, type: 'othr' })
      .expect(400);
    expect(response.body.message[0]).toEqual('type must be a valid enum value');
  });

  it('/gift-dates (POST) - try to create type OTHER without reaccurance type', async () => {
    const { recurrenceType, ...newGiftDateOtherBad } = newGiftDateOther;
    const response = await request(app.getHttpServer())
      .post('/gift-dates')
      .set(
        'Authorization',
        'bearer ' + createToken({ email: user2.email, sub: user2.cognitoSub }),
      )
      .send(newGiftDateOtherBad)
      .expect(400);
    expect(response.body.message[0]).toEqual(
      'recurrenceType should not be empty',
    );
  });

  it('/gift-dates (POST) - try to create without token', async () => {
    await request(app.getHttpServer())
      .post('/gift-dates')
      .send(newGiftDate)
      .expect(401);
  });
});
