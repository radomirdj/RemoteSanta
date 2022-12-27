import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrgDto } from './dtos/org.dto';
import { OrgTransactionDto } from './dtos/org_transaction.dto';
import { OrgTransactionTypeEnum } from '@prisma/client';
import { CreateAdminToOrgDto } from './dtos/create_admin_to_org.dto';
import { CreateOrgToEmployeesDto } from './dtos/create_org_to_employees.dto';

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
    if (!org) throw new NotFoundException('Org Not Found');
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

  async getById(orgId: string) {
    const org = await this.prisma.org.findUnique({
      where: { id: orgId },
    });
    if (!org) throw new NotFoundException('Org Not Found');

    return org;
  }

  async createTransactionAdminToOrg(
    orgId: string,
    createAdminToOrgDto: CreateAdminToOrgDto,
  ): Promise<OrgTransactionDto> {
    await this.getById(orgId);

    return this.prisma.orgTransaction.create({
      data: {
        totalAmount: createAdminToOrgDto.amount,
        type: OrgTransactionTypeEnum.ADMIN_TO_ORG,
        org: {
          connect: {
            id: orgId,
          },
        },
      },
    });
  }

  createTransactionOrgToEmployees(
    orgId: string,
    createOrgToUserDto: CreateOrgToEmployeesDto,
  ): Promise<OrgTransactionDto> {
    return this.prisma.orgTransaction.create({
      data: {
        totalAmount: createOrgToUserDto.amount,
        type: OrgTransactionTypeEnum.ORG_TO_EMPLOYEES,
        org: {
          connect: {
            id: orgId,
          },
        },
        event: {
          connect: {
            id: createOrgToUserDto.eventId,
          },
        },
      },
    });
  }
}
