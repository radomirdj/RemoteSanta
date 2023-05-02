import { Controller, Get, UseGuards, Post, Param, Body } from '@nestjs/common';
import { UserRoleEnum } from '@prisma/client';
import { CompletementStepsService } from './completement_steps.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CompletementStepDto } from './dtos/completement_step.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserDto } from '../users/dtos/user.dto';
import { UserManagerGuard } from '../guards/user_manager.guard';
import { CompletementStepStatusUpdateDto } from './dtos/completement_step_status_update.dto';

@Controller('completement-steps')
@Serialize(CompletementStepDto)
export class CompletementStepsController {
  constructor(private completementStepsService: CompletementStepsService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async getOrgList(
    @CurrentUser() user: UserDto,
  ): Promise<CompletementStepDto[]> {
    if (user.userRole !== UserRoleEnum.USER_MANAGER) return [];
    return this.completementStepsService.getListByOrg(user.org.id);
  }
  @Post('/:id/update-status')
  @UseGuards(AuthGuard('jwt'), UserManagerGuard)
  async updateOrgCompletementStep(
    @Param('id') stepId: string,
    @CurrentUser() user: UserDto,
    @Body() body: CompletementStepStatusUpdateDto,
  ) {
    return this.completementStepsService.updateOrgCompletementStatus(
      user.org.id,
      stepId,
      body.completed,
    );
  }
}
