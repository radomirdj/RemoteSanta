import { Controller, UseGuards, Body, Post, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AdminGuard } from '../guards/admin.guard';
import { AdminOrgsService } from './admin_orgs.service';
import { OrgDto } from './dtos/org.dto';
@Serialize(OrgDto)
@Controller('admin/orgs')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminOrgsController {
  constructor(private adminOrgsService: AdminOrgsService) {}

  @Get('/:id')
  async getOrgDetails(@Param('id') id: string) {
    return this.adminOrgsService.getDetails(id);
  }

  @Get('/')
  async getOrgList() {
    return this.adminOrgsService.getList();
  }
}
