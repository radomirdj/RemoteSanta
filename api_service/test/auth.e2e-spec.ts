import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/signup (POST)', () => {
    const email = 'abs@abc2.com';
    return request(app.getHttpServer())
      .post('/users/signup')
      .send({ email, password: '123456'})
      .expect(201)
      .then((res) =>  {
          const { id, email } = res.body;
          expect(id).toBeDefined();
          expect(email).toEqual(email);
      }
      )
  });
});

// const cookie = res.get('Set-Cookie)

// request.get().set('Cookie',cookie)