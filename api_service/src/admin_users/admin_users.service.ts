import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LedgerService } from '../ledger/ledger.service';
import { AdminOrgsService } from '../admin_orgs/admin_orgs.service';
import { UserDto } from '../users/dtos/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { OrgDto } from '../users/dtos/org.dto';
import { UserRoleEnum } from '.prisma/client';

@Injectable()
export class AdminUsersService {
  constructor(
    private usersService: UsersService,
    private ledgerService: LedgerService,
    private adminOrgsService: AdminOrgsService,
    private prisma: PrismaService,
  ) {}

  async getUserDetailsById(
    id: string,
    checkOrgConstraint: boolean = false,
    orgIdConstraint?: string,
  ): Promise<UserDto> {
    const user = await this.usersService.findById(id);
    if (!user || (checkOrgConstraint && orgIdConstraint !== user.org.id))
      throw new NotFoundException('User Not Found');
    if (!user) throw new NotFoundException('User Not Found');
    const userBalance = await this.ledgerService.getUserBalance(id);
    return {
      ...user,
      userBalance,
    };
  }

  async deleteUser(
    id: string,
    actionByUserId,
    checkOrgConstraint: boolean = false,
    orgIdConstraint?: string,
  ) {
    const user = await this.usersService.findDbBasicUserById(id);
    if (!user || (checkOrgConstraint && orgIdConstraint !== user.orgId))
      throw new NotFoundException('User Not Found');

    if (user.userRole !== UserRoleEnum.BASIC_USER)
      throw new MethodNotAllowedException('Only BASIC_USER can be deleted');
    const userBalance = await this.ledgerService.getUserBalance(id);
    return this.prisma.$transaction(async (tx) => {
      await this.adminOrgsService.createTransactionEmployeeToOrgUserDelete(
        tx,
        user.orgId,
        user,
        userBalance.pointsActive,
        actionByUserId,
      );
      return tx.user.update({
        where: {
          id,
        },
        data: {
          deleted: true,
        },
      });
    });
  }

  async sendPointsToEmployee(
    id: string,
    actionByUserId,
    amount: number,
    message: string,
    checkOrgConstraint: boolean = false,
    orgIdConstraint?: string,
  ) {
    const user = await this.usersService.findDbBasicUserById(id);
    const org = await this.adminOrgsService.getById(user.orgId);
    if (!user || (checkOrgConstraint && orgIdConstraint !== user.orgId))
      throw new NotFoundException('User Not Found');

    return this.prisma.$transaction(async (tx) => {
      return this.adminOrgsService.createTransactionOrgToEmployeeSend(
        tx,
        user.orgId,
        user,
        actionByUserId,
        amount,
        message,
        org.name,
      );
    });
  }
}
