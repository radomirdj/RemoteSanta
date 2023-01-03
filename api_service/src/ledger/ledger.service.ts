import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  BalanceSideTypeEnum,
  BalanceSide,
  LedgerTypeEnum,
  Ledger,
} from '@prisma/client';
import { UserBalanceDto } from './dtos/user_balance.dto';
import consts from '../utils/consts';

interface LedgerUserSideLists {
  activeList: BalanceSide[];
  reservedList: BalanceSide[];
}

@Injectable()
export class LedgerService {
  constructor(private prisma: PrismaService) {}

  createUserSides(tx, userId: string): Promise<BalanceSide[]> {
    return tx.balanceSide.createMany({
      data: [
        {
          type: BalanceSideTypeEnum.USER_ACTIVE,
          userId,
        },
        {
          type: BalanceSideTypeEnum.USER_RESERVED,
          userId,
        },
      ],
    });
  }

  async getUserListLedgerSide(
    userIdList: string[],
  ): Promise<LedgerUserSideLists> {
    const balanceSideDBList = await this.prisma.balanceSide.findMany({
      where: {
        userId: {
          in: userIdList,
        },
        type: {
          in: [
            BalanceSideTypeEnum.USER_ACTIVE,
            BalanceSideTypeEnum.USER_RESERVED,
          ],
        },
      },
    });

    const activeList = balanceSideDBList.filter(
      (balanceSideDB) => balanceSideDB.type === BalanceSideTypeEnum.USER_ACTIVE,
    );
    const reservedList = balanceSideDBList.filter(
      (balanceSideDB) =>
        balanceSideDB.type === BalanceSideTypeEnum.USER_RESERVED,
    );

    if (
      activeList.length !== userIdList.length ||
      reservedList.length !== userIdList.length
    ) {
      throw new Error('getUserListLedgerSide fails Side List.');
    }

    return {
      activeList,
      reservedList,
    };
  }

  async getOrgLedgerSide(orgId: string): Promise<BalanceSide> {
    const balanceSideDBList = await this.prisma.balanceSide.findMany({
      where: { orgId, type: BalanceSideTypeEnum.ORG },
    });
    if (balanceSideDBList.length !== 1) {
      throw new Error('getOrgLedgerSide fails Side List.');
    }

    return balanceSideDBList[0];
  }

  async createAdminToOrgTransaction(
    tx,
    orgId: string,
    amount: number,
    transactionId: string,
  ): Promise<Ledger> {
    const orgSide = await this.getOrgLedgerSide(orgId);
    return tx.ledger.create({
      data: {
        type: LedgerTypeEnum.ADMIN_TO_ORG,
        amount,
        detailsJson: { transactionId },
        from: {
          connect: {
            id: consts.platformBalanceSideId,
          },
        },
        to: {
          connect: {
            id: orgSide.id,
          },
        },
      },
    });
  }

  async createOrgToEmployesTransaction(
    tx,
    orgId: string,
    employeeIdList: string[],
    amount: number,
    transactionId: string,
  ) {
    const [{ activeList }, orgSide] = await Promise.all([
      this.getUserListLedgerSide(employeeIdList),
      this.getOrgLedgerSide(orgId),
    ]);

    const data = activeList.map((activeBalanceSide) => ({
      type: LedgerTypeEnum.ORG_TO_EMPLOYEES,
      amount,
      fromId: orgSide.id,
      toId: activeBalanceSide.id,
      detailsJson: { transactionId },
    }));
    const rsp = await tx.ledger.createMany({
      data,
    });
    if (rsp.count !== employeeIdList.length) {
      throw new Error(
        'createOrgToEmployesTransaction fails Transaction Count.',
      );
    }
    return rsp;
  }

  createGiftCardRequestTransaction(
    tx,
    type: LedgerTypeEnum,
    fromId: string,
    toId: string,
    amount: number,
    requestId: string,
  ) {
    return tx.ledger.create({
      data: {
        type,
        amount,
        detailsJson: { requestId },
        from: {
          connect: {
            id: fromId,
          },
        },
        to: {
          connect: {
            id: toId,
          },
        },
      },
    });
  }

  async createGiftCardRequestCreatedTransaction(
    tx,
    userId: string,
    amount: number,
    requestId: string,
  ) {
    const { activeList, reservedList } = await this.getUserListLedgerSide([
      userId,
    ]);

    return this.createGiftCardRequestTransaction(
      tx,
      LedgerTypeEnum.GIFT_CARD_REQUEST_CREATED,
      activeList[0].id,
      reservedList[0].id,
      amount,
      requestId,
    );
  }

  async createGiftCardRequestCompletedTransaction(
    tx,
    userId: string,
    amount: number,
    requestId: string,
  ) {
    const { reservedList } = await this.getUserListLedgerSide([userId]);

    return this.createGiftCardRequestTransaction(
      tx,
      LedgerTypeEnum.GIFT_CARD_REQUEST_COMPLETED,
      reservedList[0].id,
      consts.platformBalanceSideId,
      amount,
      requestId,
    );
  }

  async createGiftCardRequestDeclinedTransaction(
    tx,
    userId: string,
    amount: number,
    requestId: string,
  ) {
    const { activeList, reservedList } = await this.getUserListLedgerSide([
      userId,
    ]);

    return this.createGiftCardRequestTransaction(
      tx,
      LedgerTypeEnum.GIFT_CARD_REQUEST_DECLINED,
      reservedList[0].id,
      activeList[0].id,
      amount,
      requestId,
    );
  }

  async aggregateLadgerSum(idList: string[], field): Promise<number[]> {
    let where = {};
    where[field] = {
      in: idList,
    };

    const sumRsp = await this.prisma.ledger.groupBy({
      by: [field],
      _sum: {
        amount: true,
      },
      where,
    });
    return idList.map((id) => {
      const sumEl = sumRsp.find((element) => element[field] === id);
      if (!sumEl) return 0;
      return sumEl._sum.amount;
    });
  }

  async getOrgBalance(orgId): Promise<number> {
    const orgSide = await this.getOrgLedgerSide(orgId);

    const [[toOrg], [fromOrg]] = await Promise.all([
      this.aggregateLadgerSum([orgSide.id], 'toId'),
      this.aggregateLadgerSum([orgSide.id], 'fromId'),
    ]);

    return toOrg - fromOrg;
  }

  async getUserBalance(userId: string): Promise<UserBalanceDto> {
    const balanceSideDBList = await this.prisma.balanceSide.findMany({
      where: { userId: userId },
    });
    const balanceSideActive = balanceSideDBList.find(
      (balanceSide) => balanceSide.type === BalanceSideTypeEnum.USER_ACTIVE,
    );

    const balanceSideReserved = balanceSideDBList.find(
      (balanceSide) => balanceSide.type === BalanceSideTypeEnum.USER_RESERVED,
    );

    if (
      balanceSideDBList.length !== 2 ||
      !balanceSideActive ||
      !balanceSideReserved
    ) {
      throw new Error('getUserBalance fails Side List.');
    }

    const [[toActive, toReserved], [fromActive, fromReserved]] =
      await Promise.all([
        this.aggregateLadgerSum(
          [balanceSideActive.id, balanceSideReserved.id],
          'toId',
        ),
        this.aggregateLadgerSum(
          [balanceSideActive.id, balanceSideReserved.id],
          'fromId',
        ),
      ]);

    return {
      pointsActive: toActive - fromActive,
      pointsReserved: toReserved - fromReserved,
    };
  }
}
