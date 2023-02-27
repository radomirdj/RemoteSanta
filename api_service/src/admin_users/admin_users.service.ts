import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LedgerService } from '../ledger/ledger.service';
import { UserDto } from '../users/dtos/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { OrgDto } from '../users/dtos/org.dto';

@Injectable()
export class AdminUsersService {
  constructor(
    private usersService: UsersService,
    private ledgerService: LedgerService,
    private prisma: PrismaService,
  ) {}

  async getUserDetailsById(
    id: string,
    checkOrgConstraint: boolean = false,
    orgIdConstraint?: string,
  ): Promise<UserDto> {
    const user = await this.usersService.findById(id);
    if (checkOrgConstraint && orgIdConstraint !== user.org.id)
      throw new NotFoundException('User Not Found');
    if (!user) throw new NotFoundException('User Not Found');
    const userBalance = await this.ledgerService.getUserBalance(id);
    return {
      ...user,
      userBalance,
    };
  }
}
