import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { PrismaService } from '../src/prisma/prisma.service';
import { WorkerUserInvitesService } from '../src/worker_user_invites/worker_user_invites.service';
import { WorkerUserInvitesModule } from '../src/worker_user_invites/worker_user_invites.module';
import {
  userInviteSingleImportPedning,
  org1,
  user3Manager,
  userInvite1,
  user1,
} from './utils/preseededData';
import { expectUserInviteDB } from './utils/userInviteChecks';
import {
  UserInviteStatusEnum,
  UserRoleEnum,
  UserInviteSingleImportStatusEnum,
} from '.prisma/client';
import { UserInvitesModule } from '../src/user_invites/user_invites.module';
import { LedgerModule } from '../src/ledger/ledger.module';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerServiceMock } from '../src/emails/__mocks__/mailer.service.mock';
import consts from '../src/utils/consts';

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');

describe('WorkerUserInvitesService', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let workerUserInvitesService: WorkerUserInvitesService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        PrismaModule,
        UsersModule,
        UserInvitesModule,
        WorkerUserInvitesModule,
        LedgerModule,
      ],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .overrideProvider(MailerService)
      .useValue(MailerServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    workerUserInvitesService = app.get(WorkerUserInvitesService);

    await app.init();
  });

  describe('processUserInviteMessage', () => {
    const inviteMessage = {
      email: userInviteSingleImportPedning.email,
      userInviteSingleImportId: userInviteSingleImportPedning.id,
      orgId: org1.id,
      inviteSenderId: user3Manager.id,
      inviteSenderName: `${user3Manager.firstName} ${user3Manager.lastName}`,
    } as SQSUserInviteMessage;
    it('processUserInviteMessage - process with good params', async () => {
      const userInviteId =
        await workerUserInvitesService.processUserInviteMessage(inviteMessage);

      await expectUserInviteDB(prisma, userInviteId, {
        email: userInviteSingleImportPedning.email,
        status: UserInviteStatusEnum.ACTIVE,
        orgId: org1.id,
        createdById: user3Manager.id,
        userRole: UserRoleEnum.BASIC_USER,
      });
      const singleImport = await prisma.userInviteSingleImport.findUnique({
        where: { id: userInviteSingleImportPedning.id },
      });
      expect(singleImport.status).toEqual(
        UserInviteSingleImportStatusEnum.SUCCESS,
      );

      // Clean Data
      await prisma.userInviteSingleImport.updateMany({
        where: { id: userInviteSingleImportPedning.id },
        data: { status: UserInviteSingleImportStatusEnum.PENDING },
      });
      await prisma.userInvite.delete({ where: { id: userInviteId } });
    });

    it('processUserInviteMessage - invite with email exists', async () => {
      const userInviteId =
        await workerUserInvitesService.processUserInviteMessage({
          ...inviteMessage,
          email: userInvite1.email,
        });

      expect(userInviteId).toBeFalsy();
      const inviteList = await prisma.userInvite.findMany({
        where: { email: userInvite1.email },
      });
      expect(inviteList.length).toEqual(1);
      expect(inviteList[0].id).toEqual(userInvite1.id);

      const singleImport = await prisma.userInviteSingleImport.findUnique({
        where: { id: userInviteSingleImportPedning.id },
      });
      expect(singleImport.status).toEqual(
        UserInviteSingleImportStatusEnum.FAIL,
      );
      expect(singleImport.failureReason).toEqual(
        consts.userInviteImpotMessage.EMAIL_EXISTS_FAIL,
      );

      // Clean Data
      await prisma.userInviteSingleImport.updateMany({
        where: { id: userInviteSingleImportPedning.id },
        data: {
          status: UserInviteSingleImportStatusEnum.PENDING,
          failureReason: null,
        },
      });
    });

    it('processUserInviteMessage - user with email exists', async () => {
      const userInviteId =
        await workerUserInvitesService.processUserInviteMessage({
          ...inviteMessage,
          email: user1.email,
        });

      expect(userInviteId).toBeFalsy();

      const singleImport = await prisma.userInviteSingleImport.findUnique({
        where: { id: userInviteSingleImportPedning.id },
      });
      expect(singleImport.status).toEqual(
        UserInviteSingleImportStatusEnum.FAIL,
      );
      expect(singleImport.failureReason).toEqual(
        consts.userInviteImpotMessage.EMAIL_EXISTS_FAIL,
      );

      // Clean Data
      await prisma.userInviteSingleImport.updateMany({
        where: { id: userInviteSingleImportPedning.id },
        data: {
          status: UserInviteSingleImportStatusEnum.PENDING,
          failureReason: null,
        },
      });
    });

    it('processUserInviteMessage - unexpected error', async () => {
      expect.assertions(3);
      try {
        await workerUserInvitesService.processUserInviteMessage({
          ...inviteMessage,
          orgId: 'user1.email',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }

      const singleImport = await prisma.userInviteSingleImport.findUnique({
        where: { id: userInviteSingleImportPedning.id },
      });
      expect(singleImport.status).toEqual(
        UserInviteSingleImportStatusEnum.PENDING,
      );
      expect(singleImport.failureReason).toBeFalsy();
    });
  });
});
