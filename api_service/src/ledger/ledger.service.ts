import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BalanceSideTypeEnum, BalanceSide } from '@prisma/client';
import { UserBalanceDto } from './dtos/user_balance.dto';
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

  async aggregateLadgerSum(idList: string[], field) {
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
