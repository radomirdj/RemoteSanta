import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  create(reportDto: CreateReportDto, user: User) {
    return this.prisma.report.create({
      data: {
        ...reportDto,
        approved: false,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.prisma.report.findUnique({
      where: { id },
    });
    if (!report) throw new NotFoundException('Report Not Found');

    return this.prisma.report.update({ where: { id }, data: { approved } });
  }

  async createEstimate({ make, model }: GetEstimateDto) {
    const rsp = await this.prisma.report.aggregate({
      _avg: {
        price: true,
      },
      where: {
        make,
        model,
        approved: true,
      },
      orderBy: {
        price: 'asc',
      },
      take: 3,
    });

    return rsp._avg.price;
  }
}
