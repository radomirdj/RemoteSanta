import { Controller, UseGuards, Body, Post, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGiftCardRequestsService } from './admin_gift_card_requests.service';
import { AdminGuard } from '../guards/admin.guard';

@Controller('admin/gift-card-requests')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminGiftCardRequestsController {
  constructor(
    private adminGiftCardRequestsService: AdminGiftCardRequestsService,
  ) {}

  @Get('/:id')
  async getGiftCardRequest(@Param('id') id: string) {
    return this.adminGiftCardRequestsService.getOne(id);
  }

  @Get('/')
  async getGiftCardRequestList() {
    return this.adminGiftCardRequestsService.getPendingList();
  }
}
