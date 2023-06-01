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
import { BirthdayAlreadyAddedException } from '../src/errors/birthdayAlreadyAddedException';
import { GiftDateTypeEnum, GiftDateRecurrenceTypeEnum } from '@prisma/client';

jest.mock('../src/users/jwt-values.service');

describe('Gift Dates - create', () => {
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

  const newGiftDate = {
    type: GiftDateTypeEnum.HOLIDAY,
    recurrenceType: GiftDateRecurrenceTypeEnum.YEARLY,
    title: 'New Year',
    firstAccuranceDate: new Date('2022-12-31T00:00:00.000Z'),
    //   enabled shouls be ignored
    enabled: false,
  };

  const newGiftDateBirthday = {
    type: GiftDateTypeEnum.BIRTHDAY,
    // should be ignored
    recurrenceType: GiftDateRecurrenceTypeEnum.MONTHLY,
    firstAccuranceDate: new Date('2023-02-12T00:00:00.000Z'),
    // should be ignored
    title: 'New Year',
    // enabled shouls be ignored
    enabled: false,
  };

  const newGiftDateBirthdayBasic = {
    type: GiftDateTypeEnum.BIRTHDAY,
    firstAccuranceDate: new Date('2023-03-22T00:00:00.000Z'),
  };

  const newGiftDateOther = {
    type: GiftDateTypeEnum.OTHER,
    recurrenceType: GiftDateRecurrenceTypeEnum.NONE,
    firstAccuranceDate: new Date('2023-05-02T00:00:00.000Z'),
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

    expectGiftDateRsp(response.body, { ...newGiftDate, enabled: true });
    await expectGiftDateInDB(
      id,
      { ...newGiftDate, enabled: true, userId: user2.id },
      prisma,
    );

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

    expectGiftDateRsp(response.body, {
      ...newGiftDateBirthdayBasic,
      enabled: true,
      recurrenceType: GiftDateRecurrenceTypeEnum.YEARLY,
      title: null,
    });
    await expectGiftDateInDB(
      id,
      {
        ...newGiftDateBirthdayBasic,
        enabled: true,
        userId: user2.id,
        recurrenceType: GiftDateRecurrenceTypeEnum.YEARLY,
        title: null,
      },
      prisma,
    );

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

    expectGiftDateRsp(response.body, {
      ...newGiftDateBirthday,
      enabled: true,
      recurrenceType: GiftDateRecurrenceTypeEnum.YEARLY,
      title: null,
    });
    await expectGiftDateInDB(
      id,
      {
        ...newGiftDateBirthday,
        enabled: true,
        userId: user2.id,
        recurrenceType: GiftDateRecurrenceTypeEnum.YEARLY,
        title: null,
      },
      prisma,
    );

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

    expectGiftDateRsp(response.body, {
      ...newGiftDateOther,
      enabled: true,
    });
    await expectGiftDateInDB(
      id,
      {
        ...newGiftDateOther,
        enabled: true,
        userId: user2.id,
      },
      prisma,
    );

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
    expect(response.body.message[0]).toEqual(
      'type must be one of the following values: HOLIDAY, BIRTHDAY, OTHER',
    );
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

  it('/gift-dates (POST) - try to create type OTHER without firstAccuranceDate', async () => {
    const { firstAccuranceDate, ...newGiftDateOtherBad } = newGiftDateOther;
    const response = await request(app.getHttpServer())
      .post('/gift-dates')
      .set(
        'Authorization',
        'bearer ' + createToken({ email: user2.email, sub: user2.cognitoSub }),
      )
      .send(newGiftDateOtherBad)
      .expect(400);
    expect(response.body.message[0]).toEqual(
      'firstAccuranceDate must be a valid ISO 8601 date string',
    );
  });

  it('/gift-dates (POST) - try to create without token', async () => {
    await request(app.getHttpServer())
      .post('/gift-dates')
      .send(newGiftDate)
      .expect(401);
  });
});
