import { Controller, UseGuards, Body, Post, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AdminGuard } from '../guards/admin.guard';
import { AdminOrgsService } from './admin_orgs.service';
import { OrgDto } from './dtos/org.dto';
import { OrgTransactionDto } from './dtos/org_transaction.dto';
import { UserDto } from '../users/dtos/user.dto';
import { UserInviteDto } from '../user_invites/dtos/user-invite.dto';
import { CreateAdminToOrgDto } from './dtos/create_admin_to_org.dto';
import { CreateOrgToEmployeesDto } from './dtos/create_org_to_employees.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';

@Controller('admin/orgs')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminOrgsController {
  constructor(
    private adminOrgsService: AdminOrgsService,
    private usersService: UsersService,
  ) {}

  @Serialize(OrgDto)
  @Get('/:id')
  async getOrgDetails(@Param('id') id: string) {
    return this.adminOrgsService.getDetails(id);
  }

  @Serialize(OrgDto)
  @Get('/')
  async getOrgList() {
    return this.adminOrgsService.getList();
  }

  @Serialize(UserInviteDto)
  @Get('/:id/user-invites/')
  async getOrgUserInvutes(@Param('id') id: string) {
    return this.adminOrgsService.getUserInviteListByOrg(id);
  }

  @Serialize(UserDto)
  @Get('/:id/users/')
  async getOrgUsers(@Param('id') id: string) {
    return this.adminOrgsService.getUserListByOrg(id);
  }

  @Serialize(OrgTransactionDto)
  @Get('/:id/transactions/')
  async getOrgTransactions(@Param('id') id: string) {
    return this.adminOrgsService.getOrgTransactionList(id);
  }

  @Post('/:id/transactions/admin-to-org/')
  createAdminToOrgTransaction(
    @Param('id') id: string,
    @Body() body: CreateAdminToOrgDto,
    @CurrentUser() user: User,
  ) {
    return this.adminOrgsService.createTransactionAdminToOrg(id, body, user);
  }

  @Post('/:id/transactions/org-to-employees/')
  createOrgToEmployeesTransaction(
    @Param('id') id: string,
    @Body() body: CreateOrgToEmployeesDto,
    @CurrentUser() user: User,
  ) {
    return this.adminOrgsService.createTransactionOrgToEmployees(
      id,
      body,
      user,
    );
  }
}
