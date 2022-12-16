import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { EmailInUseException } from '../src/errors/emailInUseException';
import { LoginCredentialsWrongException } from '../src/errors/loginCredentialsWrongException';

import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { createToken } from './utils/tokenService';
import { user1 } from './utils/preseededData';

jest.mock('../src/users/jwt-values.service');

export const expectUserRsp = (responseBody, expectedValue) => {
  expect(responseBody.email).toEqual(expectedValue.email);
  expect(responseBody.firstName).toEqual(expectedValue.firstName);
  expect(responseBody.lastName).toEqual(expectedValue.lastName);
  expect(responseBody.gender).toEqual(expectedValue.gender);
  expect(responseBody.birthDate).toEqual(expectedValue.birthDate.toISOString());
};

export const expectUserInDB = async (expectedValue, prisma) => {
  const userList = await prisma.user.findMany({
    where: { email: expectedValue.email },
  });

  expect(userList.length).toEqual(1);
  const user = userList[0];

  expect(user.email).toEqual(expectedValue.email);
  expect(user.firstName).toEqual(expectedValue.firstName);
  expect(user.lastName).toEqual(expectedValue.lastName);
  expect(user.cognitoSub).toEqual(`sub_${expectedValue.email}`);
  expect(user.gender).toEqual(expectedValue.gender);
  expect(user.birthDate).toEqual(expectedValue.birthDate);
};

describe('Authentication system', () => {
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

  describe('/signup (POST)', () => {
    const newUser = {
      email: 'abs@abc3.com',
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

      expectUserRsp(response.body, newUser);
      await expectUserInDB(newUser, prisma);

      await prisma.user.delete({ where: { email: newUser.email } });
    });

    it('/signup (POST) - try to signup existing email', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send({ ...newUser, email: user1.email })
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
      expectUserRsp(response.body, user1);
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

      expectUserRsp(response.body, user1);
    });
  });
});
