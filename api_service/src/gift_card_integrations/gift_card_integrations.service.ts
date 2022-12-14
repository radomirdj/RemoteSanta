import { Injectable, NotFoundException } from '@nestjs/common';
import { GiftCardIntegration } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GiftCardIntegrationsService {
  constructor(private prisma: PrismaService) {}
  async getOne(id: string): Promise<GiftCardIntegration> {
    const integrationDto = await this.prisma.giftCardIntegration.findUnique({
      where: { id },
    });
    if (!integrationDto)
      throw new NotFoundException('GiftCardIntegration Not Found');
    return integrationDto;
  }

  async getAll(): Promise<GiftCardIntegration[]> {
    return this.prisma.giftCardIntegration.findMany({
      orderBy: [
        {
          priority: 'asc',
        },
      ],
    });
  }
}
