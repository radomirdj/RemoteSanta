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
  user3,
  user1ActivePoints,
  user1ReservedPoints,
  user2ActivePoints,
  user2ReservedPoints,
  user3ActivePoints,
  user3ReservedPoints,
} from './utils/preseededData';

jest.mock('../src/users/jwt-values.service');

describe('LedgerService', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let ledgerService: LedgerService;

  beforeEach(async () => {
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

  describe('LedgerService get user points', () => {
    it('Get user1 points', async () => {
      const user1Balance = await ledgerService.getUserBalance(user1.id);
      expect(user1Balance.pointsActive).toEqual(user1ActivePoints);
      expect(user1Balance.pointsReserved).toEqual(user1ReservedPoints);
    });

    it('Get user2 points', async () => {
      const user1Balance = await ledgerService.getUserBalance(user2.id);
      expect(user1Balance.pointsActive).toEqual(user2ActivePoints);
      expect(user1Balance.pointsReserved).toEqual(user2ReservedPoints);
    });

    it('Get user3 points', async () => {
      const user1Balance = await ledgerService.getUserBalance(user3.id);
      expect(user1Balance.pointsActive).toEqual(user3ActivePoints);
      expect(user1Balance.pointsReserved).toEqual(user3ReservedPoints);
    });
  });
});
