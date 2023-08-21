import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { IntegrationConsraintTypeEnum, GenderEnum } from '@prisma/client';

import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { GiftCardIntegrationsModule } from '../src/gift_card_integrations/gift_card_integrations.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import {
  giftCardIntegration1,
  user1,
  user3Manager,
  org2Manager,
  org1,
  orgNonCompletedManager,
  orgNonCompleted,
  orgNonCompletedBasic,
} from './utils/preseededData';
import { createToken } from './utils/tokenService';
import { CompletementStepsService } from '../src/completement_steps/completement_steps.service';
import consts from '../src/utils/consts';

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');

describe('/completement-steps', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let completementStepsService: CompletementStepsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        PrismaModule,
        UsersModule,
        GiftCardIntegrationsModule,
      ],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    completementStepsService = app.get(CompletementStepsService);
    await app.init();
  });

  describe('/ (GET)', () => {
    it('/ (GET) - get list of completement steps', async () => {
      const response = await request(app.getHttpServer())
        .get('/completement-steps/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .expect(200);
      expect(response.body.length).toEqual(6);
      response.body.forEach((stepStatus) => {
        expect(stepStatus.completed).toEqual(true);
      });
    });
    it('/ (GET) - get list of completement steps Org2', async () => {
      const response = await request(app.getHttpServer())
        .get('/completement-steps/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: org2Manager.email,
              sub: org2Manager.cognitoSub,
            }),
        )
        .expect(200);
      expect(response.body.length).toEqual(6);
      const rspMap = {};
      response.body.forEach((stepStatus) => {
        rspMap[stepStatus.name] = stepStatus.completed;
      });
      expect(rspMap['INVITE_EMPLOYEES']).toEqual(true);
      expect(rspMap['PERSONAL_DETAILS']).toEqual(true);
      expect(rspMap['AUTOMATIC_POINTS']).toEqual(true);
      expect(rspMap['BIRTHDAYS']).toEqual(true);
      expect(rspMap['PURCHASE_POINTS']).toEqual(true);
      expect(rspMap['TALK_TO_A_SPECIALIST']).toEqual(false);
    });
    it('/ (GET) - get list of completement steps Non Completed Org', async () => {
      const response = await request(app.getHttpServer())
        .get('/completement-steps/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: orgNonCompletedManager.email,
              sub: orgNonCompletedManager.cognitoSub,
            }),
        )
        .expect(200);
      expect(response.body.length).toEqual(6);
      response.body.forEach((stepStatus) => {
        expect(stepStatus.completed).toEqual(false);
      });
    });

    it('/ (GET) - get list of completement steps - basic user with no access', async () => {
      const response = await request(app.getHttpServer())
        .get('/completement-steps/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user1.email,
              sub: user1.cognitoSub,
            }),
        )
        .expect(200);
      expect(response.body.length).toEqual(0);
    });
    it('/ (GET) - get list of completement steps - Error with no token', async () => {
      await request(app.getHttpServer())
        .get('/completement-steps/')
        .expect(401);
    });
  });

  describe('/:id/update-status (POST)', () => {
    it('/:id/update-status (POST) - update status of completement step - status not in db', async () => {
      await request(app.getHttpServer())
        .post(
          `/completement-steps/${consts.orgCompletementSteps.INVITE_EMPLOYEES.id}/update-status`,
        )
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send({ completed: false })
        .expect(201);

      const stepStatusList = await completementStepsService.getListByOrg(
        org1.id,
      );

      expect(stepStatusList.length).toEqual(6);
      expect(stepStatusList[1].completed).toEqual(false);
      //  clear data
      await prisma.orgCompletementStepStatus.deleteMany({
        where: {
          orgCompletementStepId:
            consts.orgCompletementSteps.INVITE_EMPLOYEES.id,
          orgId: org1.id,
        },
      });
    });
    it('/:id/update-status (POST) - update status of completement step - status is in db', async () => {
      await request(app.getHttpServer())
        .post(
          `/completement-steps/${consts.orgCompletementSteps.TALK_TO_A_SPECIALIST.id}/update-status`,
        )
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send({ completed: false })
        .expect(201);

      const stepStatusList = await completementStepsService.getListByOrg(
        org1.id,
      );

      expect(stepStatusList.length).toEqual(6);
      expect(stepStatusList[0].completed).toEqual(false);
      //  clear data
      await prisma.orgCompletementStepStatus.updateMany({
        where: {
          orgCompletementStepId:
            consts.orgCompletementSteps.TALK_TO_A_SPECIALIST.id,
          orgId: org1.id,
        },
        data: {
          completed: true,
        },
      });
    });
    it('/:id/update-status (POST) - update status of completement step - NOT USER MANAGER', async () => {
      await request(app.getHttpServer())
        .post(
          `/completement-steps/${consts.orgCompletementSteps.TALK_TO_A_SPECIALIST.id}/update-status`,
        )
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user1.email,
              sub: user1.cognitoSub,
            }),
        )
        .send({ completed: false })
        .expect(403);
    });
    it('/:id/update-status (POST) - update status of completement step - WRONG ID', async () => {
      await request(app.getHttpServer())
        .post(`/completement-steps/${user1.id}/update-status`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send({ completed: false })
        .expect(404);
    });
  });
  describe('/set-signup-bonus (POST)', () => {
    it('/ (POST) - set-signup-bonus by Non Completed Org', async () => {
      await request(app.getHttpServer())
        .post('/completement-steps/set-signup-bonus/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: orgNonCompletedManager.email,
              sub: orgNonCompletedManager.cognitoSub,
            }),
        )
        .send({ signupPoints: 150 })
        .expect(201);
      const stepStatusList = await completementStepsService.getListByOrg(
        orgNonCompleted.id,
      );
      expect(stepStatusList[2].completed).toEqual(true);
      const orgDb = await prisma.org.findUnique({
        where: { id: orgNonCompleted.id },
      });
      expect(orgDb.signupPoints).toEqual(150);
      //  clear data
      await prisma.orgCompletementStepStatus.updateMany({
        where: {
          orgCompletementStepId:
            consts.orgCompletementSteps.AUTOMATIC_POINTS.id,
          orgId: orgNonCompleted.id,
        },
        data: {
          completed: false,
        },
      });
      await prisma.org.update({
        where: {
          id: orgNonCompleted.id,
        },
        data: {
          signupPoints: 0,
        },
      });
    });

    it('/ (POST) - set-signup-bonus by Non Completed Org - BASIC user error', async () => {
      await request(app.getHttpServer())
        .post('/completement-steps/set-signup-bonus/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: orgNonCompletedBasic.email,
              sub: orgNonCompletedBasic.cognitoSub,
            }),
        )
        .send({ signupPoints: 150 })
        .expect(403);
    });
  });
  describe('/set-personal-details (POST)', () => {
    it('/ (POST) - set-personal-details by Non Completed Org', async () => {
      await request(app.getHttpServer())
        .post('/completement-steps/set-personal-details/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: orgNonCompletedManager.email,
              sub: orgNonCompletedManager.cognitoSub,
            }),
        )
        .send({
          gender: GenderEnum.FEMALE,
          birthDate: new Date('2000-04-31T00:00:00.000Z'),
        })
        .expect(201);
      const stepStatusList = await completementStepsService.getListByOrg(
        orgNonCompleted.id,
      );
      expect(stepStatusList[3].completed).toEqual(true);
      const userDb = await prisma.user.findUnique({
        where: { id: orgNonCompletedManager.id },
      });
      expect(userDb.gender).toEqual(GenderEnum.FEMALE);
      expect(userDb.birthDate).toEqual(new Date('2000-04-31T00:00:00.000Z'));

      //  clear data
      await prisma.orgCompletementStepStatus.updateMany({
        where: {
          orgCompletementStepId:
            consts.orgCompletementSteps.PERSONAL_DETAILS.id,
          orgId: orgNonCompleted.id,
        },
        data: {
          completed: false,
        },
      });

      await prisma.user.update({
        where: {
          id: orgNonCompletedManager.id,
        },
        data: {
          birthDate: null,
          gender: null,
        },
      });
    });

    it('/ (POST) - set-personal-details by Non Completed Org, update just gender', async () => {
      await request(app.getHttpServer())
        .post('/completement-steps/set-personal-details/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: orgNonCompletedManager.email,
              sub: orgNonCompletedManager.cognitoSub,
            }),
        )
        .send({
          gender: GenderEnum.FEMALE,
        })
        .expect(201);
      const stepStatusList = await completementStepsService.getListByOrg(
        orgNonCompleted.id,
      );
      expect(stepStatusList[3].completed).toEqual(true);
      const userDb = await prisma.user.findUnique({
        where: { id: orgNonCompletedManager.id },
      });
      expect(userDb.gender).toEqual(GenderEnum.FEMALE);
      expect(userDb.birthDate).toBeNull();

      //  clear data
      await prisma.orgCompletementStepStatus.updateMany({
        where: {
          orgCompletementStepId:
            consts.orgCompletementSteps.PERSONAL_DETAILS.id,
          orgId: orgNonCompleted.id,
        },
        data: {
          completed: false,
        },
      });

      await prisma.user.update({
        where: {
          id: orgNonCompletedManager.id,
        },
        data: {
          gender: null,
        },
      });
    });

    it('/ (POST) - set-personal-details by Non Completed Org - BASIC user error', async () => {
      await request(app.getHttpServer())
        .post('/completement-steps/set-personal-details/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: orgNonCompletedBasic.email,
              sub: orgNonCompletedBasic.cognitoSub,
            }),
        )
        .send({
          gender: GenderEnum.FEMALE,
          birthDate: new Date('2000-04-31T00:00:00.000Z'),
        })
        .expect(403);
    });
  });
});
