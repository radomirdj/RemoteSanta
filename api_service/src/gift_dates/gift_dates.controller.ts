import {
  Controller,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftDatesService } from './gift_dates.service';
import { CreateGiftDateDto } from './dtos/create_gift_date.dto';
import { UpdateGiftDateDto } from './dtos/update_gift_date.dto';
import { ChangeStatusGiftDateDto } from './dtos/change_status_gift_date.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('gift-dates')
@UseGuards(AuthGuard('jwt'))
export class GiftDatesController {
  constructor(private giftDatesService: GiftDatesService) {}
  @Post()
  //   @Serialize(ReportDto)
  createGiftDate(@Body() body: CreateGiftDateDto, @CurrentUser() user: User) {
    return this.giftDatesService.create(body, user);
  }

  @Patch('/:id')
  updateGiftDate(
    @Param('id') id: string,
    @Body() body: UpdateGiftDateDto,
    @CurrentUser() user: User,
  ) {
    return this.giftDatesService.update(id, body, user);
  }

  @Post('/:id/change-status')
  changeStatus(
    @Param('id') id: string,
    @Body() body: ChangeStatusGiftDateDto,
    @CurrentUser() user: User,
  ) {
    return this.giftDatesService.changeGiftStatus(id, body, user);
  }

  //   TODO Serialize
  @Get('/:id')
  async getGiftDate(@Param('id') id: string, @CurrentUser() user: User) {
    return this.giftDatesService.getOneByUser(id, user.id);
  }

  @Get('/')
  async getGiftDateList(@CurrentUser() user: User) {
    return this.giftDatesService.getByUser(user.id);
  }
}
