import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from './../src/users/users.module';
import { AwsCognitoService } from './../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from './../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');
jest.mock(
  '../src/currency_rates/currency_rates_api/currency_rates_api.service',
);

describe('AppController (e2e)', () => {
  let app: INestApplication;
  // let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    // prisma = app.get(PrismaService);
    await app.init();
  });

  it('/ (GET)', async () => {
    // const reports = await prisma.report.findMany();
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
