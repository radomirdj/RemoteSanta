import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminOrgsService } from '../admin_orgs/admin_orgs.service';
import { UserManagerGuard } from '../guards/user_manager.guard';
import { OrgDto } from '../admin_orgs/dtos/org.dto';
import { UserDto } from '../users/dtos/user.dto';
import { OrgTransactionDto } from '../admin_orgs/dtos/org_transaction.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';

@Controller('orgs')
export class OrgsController {
  constructor(
    private adminOrgsService: AdminOrgsService,
    private usersService: UsersService,
  ) {}

  @Serialize(OrgDto)
  @Get('/current_org')
  @UseGuards(AuthGuard('jwt'), UserManagerGuard)
  async getOrgDetails(@CurrentUser() user: User) {
    return this.adminOrgsService.getDetails(user.orgId);
  }

  @Serialize(UserDto)
  @Get('/current_org/users/')
  @UseGuards(AuthGuard('jwt'))
  async getOrgUsers(@CurrentUser() user: User) {
    return this.usersService.findByOrg(user.orgId);
  }

  @Serialize(OrgTransactionDto)
  @Get('/current_org/transactions/')
  @UseGuards(AuthGuard('jwt'), UserManagerGuard)
  async getOrgTransactions(@CurrentUser() user: User) {
    return this.adminOrgsService.getOrgTransactionList(user.orgId);
  }
}
