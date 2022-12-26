import { Controller, UseGuards, Body, Post, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
import { AdminOrgsService } from './admin_orgs.service';

@Controller('admin/orgs')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminOrgsController {
  constructor(private adminOrgsService: AdminOrgsService) {}
  @Get('/')
  async getGiftCardRequestList() {
    return this.adminOrgsService.getList();
  }
}
