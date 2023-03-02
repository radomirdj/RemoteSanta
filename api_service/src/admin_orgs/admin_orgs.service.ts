import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LedgerService } from '../ledger/ledger.service';
import { OrgDto } from './dtos/org.dto';
import { OrgTransactionDto } from './dtos/org_transaction.dto';
import {
  OrgTransactionTypeEnum,
  User,
  Org,
  ClaimPointsEventTypeEnum,
} from '@prisma/client';
import { CreateAdminToOrgDto } from './dtos/create_admin_to_org.dto';
import { CreateOrgToEmployeesDto } from './dtos/create_org_to_employees.dto';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dtos/user.dto';
import { EmailsService } from '../emails/emails.service';

@Injectable()
export class AdminOrgsService {
  constructor(
    private prisma: PrismaService,
    private ledgerService: LedgerService,
    private usersService: UsersService,
    private emailsService: EmailsService,
  ) {}

  async getDetails(id: string): Promise<OrgDto> {
    // Soft delete won't work if we add count into same query
    const employeeCountPromise = this.prisma.user.count({
      where: { orgId: id },
    });
    const orgPromise = this.prisma.org.findUnique({
      where: { id },
    });
    const [employeeCount, org] = await Promise.all([
      employeeCountPromise,
      orgPromise,
    ]);

    if (!org) throw new NotFoundException('Org Not Found');

    const balance = await this.ledgerService.getOrgBalance(id);
    return {
      employeeNumber: employeeCount,
      balance,
      totalPointsPerMonth: employeeCount * org.pointsPerMonth,
      ...org,
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

  async getUserListByOrg(orgId: string): Promise<UserDto[]> {
    const [org, rsp] = await Promise.all([
      this.getById(orgId),
      this.usersService.findByOrg(orgId),
    ]);
    return rsp;
  }

  private getEmployeeBasicsListByOrg(orgId: string): Promise<User[]> {
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

  async createOrgTransactionToEmployees(
    tx,
    orgId: string,
    eventId: string,
    employeeList: User[],
    pointsPerEmployee: number,
    createdById: string,
    finalFunc = null,
  ): Promise<OrgTransactionDto> {
    const orgTransaction = await tx.orgTransaction.create({
      data: {
        totalAmount: employeeList.length * pointsPerEmployee,
        type: OrgTransactionTypeEnum.ORG_TO_EMPLOYEES_BY_EVENT,
        org: {
          connect: {
            id: orgId,
          },
        },
        createdBy: {
          connect: {
            id: createdById,
          },
        },
        event: {
          connect: {
            id: eventId,
          },
        },
      },
    });
    const eventFulfillmentData = employeeList.map((employee: User) => ({
      amount: pointsPerEmployee,
      orgTransactionId: orgTransaction.id,
      userId: employee.id,
    }));
    const { count } = await tx.claimPointsEventFulfillment.createMany({
      data: eventFulfillmentData,
    });

    if (count !== employeeList.length)
      throw new ConflictException("Employee Number doesn't match DB.");

    await this.ledgerService.createOrgToEmployesTransaction(
      tx,
      orgId,
      employeeList.map((employee) => employee.id),
      pointsPerEmployee,
      orgTransaction.id,
    );

    if (finalFunc) await finalFunc();
    return orgTransaction;
  }

  async createTransactionOrgToEmployeeSignup(
    tx,
    orgId: string,
    user: User,
  ): Promise<OrgTransactionDto | null> {
    const [org, claimPointsEventList] = await Promise.all([
      this.getById(orgId),
      this.prisma.claimPointsEvent.findMany({
        where: { type: ClaimPointsEventTypeEnum.SIGN_UP_EVENT },
      }),
    ]);
    if (org.signupPoints <= 0) return null;
    const claimPointsEvent = claimPointsEventList[0];

    return this.createOrgTransactionToEmployees(
      tx,
      orgId,
      claimPointsEvent.id,
      [user],
      org.signupPoints,
      user.id,
    );
  }

  async createTransactionOrgToEmployeesMonthly(
    orgId: string,
    createOrgToUserDto: CreateOrgToEmployeesDto,
    admin: User,
  ): Promise<OrgTransactionDto> {
    const [org, employeeList, claimPointsEvent] = await Promise.all([
      this.getById(orgId),
      this.getEmployeeBasicsListByOrg(orgId),
      this.prisma.claimPointsEvent.findUnique({
        where: { id: createOrgToUserDto.eventId },
      }),
    ]);
    if (employeeList.length !== createOrgToUserDto.employeeNumber)
      throw new ConflictException("Employee Number doesn't match DB.");

    return this.prisma.$transaction(async (tx) => {
      return this.createOrgTransactionToEmployees(
        tx,
        orgId,
        claimPointsEvent.id,
        employeeList,
        org.pointsPerMonth,
        admin.id,
        async () => {
          const to = employeeList.map((employee) => employee.email);
          await this.emailsService.sendClaimPointsEmail(
            to.slice(0, 50),
            claimPointsEvent.description,
          );
        },
      );
    });
  }
}
