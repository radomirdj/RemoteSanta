import { Controller, UseGuards, Body, Post, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ClaimPointsEventsService } from './claim_points_events.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ClaimPointsEventDto } from './dtos/claim_points_event.dto';

@Serialize(ClaimPointsEventDto)
@Controller('claim-points-events')
@UseGuards(AuthGuard('jwt'))
export class ClaimPointsEventsController {
  constructor(private claimPointsEventsService: ClaimPointsEventsService) {}

  @Get('/')
  async getClaimPointsEventsList(@CurrentUser() user: User) {
    return this.claimPointsEventsService.getByUser(user.id, user.orgId);
  }
}
