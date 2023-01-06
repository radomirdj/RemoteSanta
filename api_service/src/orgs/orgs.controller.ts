import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminOrgsService } from '../admin_orgs/admin_orgs.service';
import { UserManagerGuard } from '../guards/user_manager.guard';
import { OrgDto } from '../admin_orgs/dtos/org.dto';
import { OrgTransactionDto } from '../admin_orgs/dtos/org_transaction.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('orgs')
@UseGuards(AuthGuard('jwt'), UserManagerGuard)
export class OrgsController {
  constructor(private adminOrgsService: AdminOrgsService) {}

  @Serialize(OrgDto)
  @Get('/current_org')
  async getOrgDetails(@CurrentUser() user: User) {
    return this.adminOrgsService.getDetails(user.orgId);
  }

  @Serialize(OrgTransactionDto)
  @Get('/current_org/transactions/')
  async getOrgTransactions(@CurrentUser() user: User) {
    return this.adminOrgsService.getOrgTransactionList(user.orgId);
  }
}
