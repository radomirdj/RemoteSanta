import { Controller, UseGuards, Body, Post, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftCardRequestService } from './gift_card_request.service';
import { CreateGiftCardRequestDto } from './dtos/create_gift_card_request.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('gift-card-requests')
@UseGuards(AuthGuard('jwt'))
export class GiftCardRequestController {
  constructor(private giftCardRequestService: GiftCardRequestService) {}

  @Post()
  createGiftCardRequest(
    @Body() body: CreateGiftCardRequestDto,
    @CurrentUser() user: User,
  ) {
    return this.giftCardRequestService.create(body, user);
  }

  @Get('/:id')
  async getGiftCardRequest(@Param('id') id: string, @CurrentUser() user: User) {
    return this.giftCardRequestService.getOneByUser(id, user.id);
  }

  @Get('/')
  async getGiftCardRequestList(@CurrentUser() user: User) {
    return this.giftCardRequestService.getByUser(user.id);
  }
}
