import { Controller, UseGuards, Body, Post, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AdminGuard } from '../guards/admin.guard';
import { AdminOrgsService } from './admin_orgs.service';
import { OrgDto } from './dtos/org.dto';
import { OrgTransactionDto } from './dtos/org_transaction.dto';

@Controller('admin/orgs')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminOrgsController {
  constructor(private adminOrgsService: AdminOrgsService) {}

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

  @Serialize(OrgTransactionDto)
  @Get('/:id/transactions/')
  async getOrgTransactions(@Param('id') id: string) {
    return this.adminOrgsService.getOrgTransactionList(id);
  }
}
