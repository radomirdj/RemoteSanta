import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrgDto } from './dtos/org.dto';
import { OrgTransactionDto } from './dtos/org_transaction.dto';
@Injectable()
export class AdminOrgsService {
  constructor(private prisma: PrismaService) {}

  async getDetails(id: string): Promise<OrgDto> {
    const org = await this.prisma.org.findUnique({
      include: {
        _count: {
          select: { User: true },
        },
      },
      where: { id },
    });
    if (!org) throw new NotFoundException('GiftCardRequest Not Found');
    const { _count, ...otherData } = org;

    return {
      userCount: _count.User,
      totalPointsPerMonth: _count.User * otherData.pointsPerMonth,
      ...otherData,
    };
  }

  getList(): Promise<OrgDto[]> {
    return this.prisma.org.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });
  }

  getOrgTransactionList(orgId: string): Promise<OrgTransactionDto[]> {
    return this.prisma.orgTransaction.findMany({
      include: {
        event: true,
      },
      where: {
        orgId,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  }
}
