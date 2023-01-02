import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BalanceSideTypeEnum, BalanceSide } from '@prisma/client';

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
}
