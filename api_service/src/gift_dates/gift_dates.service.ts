import { Injectable, NotFoundException } from '@nestjs/common';
import { User, GiftDate } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateGiftDateDto } from './dtos/create_gift_date.dto';
import { UpdateGiftDateDto } from './dtos/update_gift_date.dto';
import { ChangeStatusGiftDateDto } from './dtos/change_status_gift_date.dto';
import { GiftDateTypeEnum, GiftDateRecurrenceTypeEnum } from '@prisma/client';
import { BirthdayAlreadyAddedException } from '../errors/birthdayAlreadyAddedException';

@Injectable()
export class GiftDatesService {
  constructor(private prisma: PrismaService) {}
  async create(giftDateDto: CreateGiftDateDto, user: User) {
    if (giftDateDto.type === GiftDateTypeEnum.BIRTHDAY) {
      giftDateDto.title = null;
      giftDateDto.recurrenceType = GiftDateRecurrenceTypeEnum.YEARLY;
      const alreadyAddedBirthdays = await this.prisma.giftDate.findMany({
        where: {
          userId: user.id,
          type: GiftDateTypeEnum.BIRTHDAY,
          enabled: true,
        },
      });
      if (alreadyAddedBirthdays.length) {
        throw new BirthdayAlreadyAddedException();
      }
    }
    return this.prisma.giftDate.create({
      data: {
        ...giftDateDto,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }

  async getOneByUser(id: string, userId: string): Promise<GiftDate> {
    const giftDateDto = await this.prisma.giftDate.findUnique({
      where: { id },
    });
    if (!giftDateDto || giftDateDto.userId !== userId)
      throw new NotFoundException('GiftDate Not Found');
    return giftDateDto;
  }

  async update(id: string, updateGiftDto: UpdateGiftDateDto, user: User) {
    await this.getOneByUser(id, user.id);
    return this.prisma.giftDate.update({
      where: { id },
      data: { title: updateGiftDto.title },
    });
  }

  async changeGiftStatus(
    id: string,
    changeStatusGiftDateDto: ChangeStatusGiftDateDto,
    user: User,
  ) {
    await this.getOneByUser(id, user.id);
    return this.prisma.giftDate.update({
      where: { id },
      data: { enabled: changeStatusGiftDateDto.enabled },
    });
  }

  getByUser(userId: string): Promise<GiftDate[]> {
    return this.prisma.giftDate.findMany({
      where: { userId, enabled: true },
    });
  }
}
