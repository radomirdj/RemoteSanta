import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClaimPointsEvent } from '@prisma/client';
import { ClaimPointsEventDto } from './dtos/claim_points_event.dto';
@Injectable()
export class ClaimPointsEventsService {
  constructor(private prisma: PrismaService) {}

  async getByUser(
    userId: string,
    orgId: string,
  ): Promise<ClaimPointsEventDto[]> {
    const org = await this.prisma.org.findUnique({
      where: { id: orgId },
    });
    const pointsEventList = await this.prisma.claimPointsEvent.findMany({
      where: {
        validTo: {
          gte: new Date(),
        },
      },
      include: {
        ClaimPointsEventFulfillment: {
          where: {
            userId,
          },
        },
      },
      orderBy: [
        {
          validTo: 'asc',
        },
      ],
    });
    return pointsEventList.map((pointsEvent) => {
      const { ClaimPointsEventFulfillment, ...restData } = pointsEvent;
      if (!ClaimPointsEventFulfillment.length)
        return { ...restData, amount: org.pointsPerMonth };
      return {
        claimPointsEventFulfillment: ClaimPointsEventFulfillment[0],
        ...restData,
      };
    });
  }
}
