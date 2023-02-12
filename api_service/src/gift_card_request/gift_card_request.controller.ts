import { Controller, UseGuards, Body, Post, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftCardRequestService } from './gift_card_request.service';
import { CreateGiftCardRequestDto } from './dtos/create_gift_card_request.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GiftCardRequestDto } from './dtos/gift_card_request.dto';
import { GiftCardFileDto } from './dtos/gift_card_file.dto';

@Controller('gift-card-requests')
@UseGuards(AuthGuard('jwt'))
export class GiftCardRequestController {
  constructor(private giftCardRequestService: GiftCardRequestService) {}

  @Serialize(GiftCardRequestDto)
  @Post()
  createGiftCardRequest(
    @Body() body: CreateGiftCardRequestDto,
    @CurrentUser() user: User,
  ) {
    return this.giftCardRequestService.create(body, user);
  }

  @Serialize(GiftCardRequestDto)
  @Get('/:id')
  async getGiftCardRequest(@Param('id') id: string, @CurrentUser() user: User) {
    return this.giftCardRequestService.getOneByUser(id, user.id);
  }

  @Serialize(GiftCardFileDto)
  @Get('/:id/file')
  async getGiftCardFile(@Param('id') id: string, @CurrentUser() user: User) {
    const url = await this.giftCardRequestService.getGiftCardRequestFile(
      id,
      user.id,
    );
    return {
      url,
    } as GiftCardFileDto;
  }

  @Serialize(GiftCardRequestDto)
  @Get('/')
  async getGiftCardRequestList(@CurrentUser() user: User) {
    return this.giftCardRequestService.getByUser(user.id);
  }
}
