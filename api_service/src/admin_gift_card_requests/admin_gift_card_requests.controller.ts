import { Controller, UseGuards, Body, Post, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGiftCardRequestsService } from './admin_gift_card_requests.service';
import { AdminGuard } from '../guards/admin.guard';
import { FulfillGiftCardRequestDto } from './dtos/fulfill_giift_card_request.dto';
import { DeclineGiftCardRequestDto } from './dtos/decline_giift_card_request.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('admin/gift-card-requests')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminGiftCardRequestsController {
  constructor(
    private adminGiftCardRequestsService: AdminGiftCardRequestsService,
  ) {}

  @Post('/:id/fulfill')
  createGiftCardRequest(
    @Param('id') id: string,
    @Body() body: FulfillGiftCardRequestDto,
    @CurrentUser() user: User,
  ) {
    return this.adminGiftCardRequestsService.fulfillRequest(id, body, user);
  }

  @Post('/:id/decline')
  declineGiftCardRequest(
    @Param('id') id: string,
    @Body() body: DeclineGiftCardRequestDto,
  ) {
    return this.adminGiftCardRequestsService.declineRequest(id, body);
  }

  @Get('/:id')
  async getGiftCardRequest(@Param('id') id: string) {
    return this.adminGiftCardRequestsService.getOne(id);
  }

  @Get('/')
  async getGiftCardRequestList() {
    return this.adminGiftCardRequestsService.getPendingList();
  }
}
