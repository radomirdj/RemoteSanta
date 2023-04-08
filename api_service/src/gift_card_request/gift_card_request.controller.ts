import {
  Controller,
  UseGuards,
  Body,
  Post,
  Get,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftCardRequestService } from './gift_card_request.service';
import { CreateGiftCardRequestDto } from './dtos/create_gift_card_request.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GiftCardRequestDto } from './dtos/gift_card_request.dto';
import { GiftCardFileDto } from './dtos/gift_card_file.dto';
import { UserDto } from '../users/dtos/user.dto';

@Controller('gift-card-requests')
@UseGuards(AuthGuard('jwt'))
export class GiftCardRequestController {
  constructor(private giftCardRequestService: GiftCardRequestService) {}

  @Serialize(GiftCardRequestDto)
  @Post()
  createGiftCardRequest(
    @Body() body: CreateGiftCardRequestDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.giftCardRequestService.create(body, user);
  }

  @Serialize(GiftCardRequestDto)
  @Get('/:id')
  async getGiftCardRequest(@Param('id') id: string, @CurrentUser() user: User) {
    return this.giftCardRequestService.getOneByUser(id, user.id);
  }

  @Get('/:id/file')
  async getGiftCardFile(@Param('id') id: string, @CurrentUser() user: User) {
    const filename =
      await this.giftCardRequestService.getGiftCardRequestFileName(id, user.id);
    const filestream = await this.giftCardRequestService.getGiftCardFileStream(
      filename,
    );
    return new StreamableFile(filestream);
  }

  @Serialize(GiftCardRequestDto)
  @Get('/')
  async getGiftCardRequestList(@CurrentUser() user: User) {
    return this.giftCardRequestService.getByUser(user.id);
  }
}
