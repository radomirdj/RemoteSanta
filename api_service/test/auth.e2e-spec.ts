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
    const email = 'abs@abc3.com';
    const firstName = 'Peter';
    const lastName = 'Pan';
    const password = '123456';

    it('/signup (POST) - with good params', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send({ email, password: '123456', firstName, lastName })
        .expect(201);

      const userList = await prisma.user.findMany({
        where: { email },
      });
      expect(response.body.email).toEqual(email);
      expect(response.body.firstName).toEqual(firstName);
      expect(response.body.lastName).toEqual(lastName);

      expect(userList.length).toEqual(1);
      expect(userList[0].email).toEqual(email);
      expect(userList[0].firstName).toEqual(firstName);
      expect(userList[0].lastName).toEqual(lastName);
      expect(userList[0].cognitoSub).toEqual(`sub_${email}`);

      await prisma.user.delete({ where: { email } });
    });

    it('/signup (POST) - try to signup existing email', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send({ email: user1.email, password, firstName, lastName })
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
      expect(response.body.email).toEqual(user1.email);
    });
    it('/login (POST) - wrong email', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({ email: `a${user1.email}`, password: user1.password })
        .expect(401);
      expect(response.body.message).toEqual(
        LoginCredentialsWrongException.defaultMessage,
      );
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

      expect(response.body.email).toEqual(user1.email);
      expect(response.body.firstName).toEqual(user1.firstName);
      expect(response.body.lastName).toEqual(user1.lastName);
    });
  });
});
