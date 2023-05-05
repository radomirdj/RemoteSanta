import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { LedgerModule } from '../src/ledger/ledger.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { LedgerService } from '../src/ledger/ledger.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import {
  user1,
  user2,
  user3Manager,
  user1ActivePoints,
  user1ReservedPoints,
  user2ActivePoints,
  user2ReservedPoints,
  user3ActivePoints,
  user3ReservedPoints,
  org1Points,
  org2Points,
  org1,
  org2,
} from './utils/preseededData';
import { checkBalance } from './utils/ledgerChecks';

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');
 

describe('LedgerService', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let ledgerService: LedgerService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule, LedgerModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    ledgerService = app.get(LedgerService);
    await app.init();
  });

  describe('LedgerService get User points', () => {
    it('Get user1 points', async () => {
      await checkBalance(ledgerService, user1.id, {
        pointsActive: user1ActivePoints,
        pointsReserved: user1ReservedPoints,
      });
    });

    it('Get user2 points', async () => {
      await checkBalance(ledgerService, user2.id, {
        pointsActive: user2ActivePoints,
        pointsReserved: user2ReservedPoints,
      });
    });

    it('Get user3Manager points', async () => {
      await checkBalance(ledgerService, user3Manager.id, {
        pointsActive: user3ActivePoints,
        pointsReserved: user3ReservedPoints,
      });
    });
  });

  describe('LedgerService get Org points', () => {
    it('Get org1 points', async () => {
      const user1Balance = await ledgerService.getOrgBalance(org1.id);
      expect(user1Balance).toEqual(org1Points);
    });

    it('Get org2 points', async () => {
      const user2Balance = await ledgerService.getOrgBalance(org2.id);
      expect(user2Balance).toEqual(org2Points);
    });
  });
});
