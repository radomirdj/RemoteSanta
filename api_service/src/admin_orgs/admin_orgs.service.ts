import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LedgerService } from '../ledger/ledger.service';
import { OrgDto } from './dtos/org.dto';
import { OrgTransactionDto } from './dtos/org_transaction.dto';
import { OrgTransactionTypeEnum, User, Org } from '@prisma/client';
import { CreateAdminToOrgDto } from './dtos/create_admin_to_org.dto';
import { CreateOrgToEmployeesDto } from './dtos/create_org_to_employees.dto';

@Injectable()
export class AdminOrgsService {
  constructor(
    private prisma: PrismaService,
    private ledgerService: LedgerService,
  ) {}

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

    const balance = await this.ledgerService.getOrgBalance(id);
    return {
      employeeNumber: _count.User,
      balance,
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

  async getById(orgId: string): Promise<Org> {
    const org = await this.prisma.org.findUnique({
      where: { id: orgId },
    });
    if (!org) throw new NotFoundException('Org Not Found');

    return org;
  }

  getEmployeeListByOrg(orgId: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { orgId },
    });
  }

  async createTransactionAdminToOrg(
    orgId: string,
    createAdminToOrgDto: CreateAdminToOrgDto,
    admin: User,
  ): Promise<OrgTransactionDto> {
    await this.getById(orgId);

    return this.prisma.$transaction(async (tx) => {
      const orgTransaction = await tx.orgTransaction.create({
        data: {
          totalAmount: createAdminToOrgDto.amount,
          type: OrgTransactionTypeEnum.ADMIN_TO_ORG,
          org: {
            connect: {
              id: orgId,
            },
          },
          createdBy: {
            connect: {
              id: admin.id,
            },
          },
        },
      });
      await this.ledgerService.createAdminToOrgTransaction(
        tx,
        orgId,
        createAdminToOrgDto.amount,
        orgTransaction.id,
      );
      return orgTransaction;
    });
  }

  async createTransactionOrgToEmployees(
    orgId: string,
    createOrgToUserDto: CreateOrgToEmployeesDto,
    admin: User,
  ): Promise<OrgTransactionDto> {
    const [org, employeeList] = await Promise.all([
      this.getById(orgId),
      this.getEmployeeListByOrg(orgId),
    ]);
    if (employeeList.length !== createOrgToUserDto.employeeNumber)
      throw new ConflictException("Employee Number doesn't match DB.");

    return this.prisma.$transaction(async (tx) => {
      const orgTransaction = await tx.orgTransaction.create({
        data: {
          totalAmount: createOrgToUserDto.employeeNumber * org.pointsPerMonth,
          type: OrgTransactionTypeEnum.ORG_TO_EMPLOYEES,
          org: {
            connect: {
              id: orgId,
            },
          },
          createdBy: {
            connect: {
              id: admin.id,
            },
          },
          event: {
            connect: {
              id: createOrgToUserDto.eventId,
            },
          },
        },
      });
      const eventFulfillmentData = employeeList.map((employee: User) => ({
        amount: org.pointsPerMonth,
        orgTransactionId: orgTransaction.id,
        userId: employee.id,
      }));
      const { count } = await tx.claimPointsEventFulfillment.createMany({
        data: eventFulfillmentData,
      });

      if (count !== createOrgToUserDto.employeeNumber)
        throw new ConflictException("Employee Number doesn't match DB.");

      await this.ledgerService.createOrgToEmployesTransaction(
        tx,
        orgId,
        employeeList.map((employee) => employee.id),
        org.pointsPerMonth,
        orgTransaction.id,
      );

      return orgTransaction;
    });
  }
}
