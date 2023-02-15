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
import { ClaimPointsEventTypeEnum } from '@prisma/client';

import {
  user1,
  user2,
  admin,
  lastClaimPointsEvent,
} from './utils/preseededData';

jest.mock('../src/users/jwt-values.service');

describe('/claim-points-events', () => {
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

  describe('/ (GET)', () => {
    it('/ (GET) - get claim-points-events list for user1 - fulfilled last event', async () => {
      const response = await request(app.getHttpServer())
        .get('/claim-points-events/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .expect(200);
      const eventList = response.body;
      expect(new Date(eventList[0].validTo).getTime()).toBeGreaterThan(
        new Date().getTime(),
      );
      eventList.forEach((event) =>
        expect(event.type).toEqual(
          ClaimPointsEventTypeEnum.MONTHLY_ORG_TO_EMPLOYEE,
        ),
      );
      const lastEvent = eventList[eventList.length - 1];
      expect(lastEvent.description).toEqual(lastClaimPointsEvent.description);
      expect(lastEvent.claimPointsEventFulfillment).toBeDefined();
      expect(lastEvent.claimPointsEventFulfillment.amount).toEqual(
        lastClaimPointsEvent.claimPointsEventFulfillment.amount,
      );
      expect(lastEvent.title).toEqual(lastClaimPointsEvent.title);
    });

    it('/ (GET) - get claim-points-events list for ADMIN - fulfilled last event', async () => {
      const response = await request(app.getHttpServer())
        .get('/claim-points-events/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);
      const eventList = response.body;
      expect(new Date(eventList[0].validTo).getTime()).toBeGreaterThan(
        new Date().getTime(),
      );
      eventList.forEach((event) =>
        expect(event.type).toEqual(
          ClaimPointsEventTypeEnum.MONTHLY_ORG_TO_EMPLOYEE,
        ),
      );
      const lastEvent = eventList[eventList.length - 1];
      expect(lastEvent.description).toEqual(lastClaimPointsEvent.description);
      expect(lastEvent.claimPointsEventFulfillment).toBeFalsy();
      expect(lastEvent.title).toEqual(lastClaimPointsEvent.title);
    });

    it("/ (GET) - get claim-points-events list for user2 - didn't fulfilled last event", async () => {
      const response = await request(app.getHttpServer())
        .get('/claim-points-events/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(200);
      const eventList = response.body;
      expect(new Date(eventList[0].validTo).getTime()).toBeGreaterThan(
        new Date().getTime(),
      );
      const lastEvent = eventList[eventList.length - 1];
      expect(lastEvent.description).toEqual(lastClaimPointsEvent.description);
      expect(lastEvent.claimPointsEventFulfillment).toBeFalsy();
      expect(lastEvent.title).toEqual(lastClaimPointsEvent.title);
    });
  });
});
