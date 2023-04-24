import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRoleEnum } from '@prisma/client';
import { CompletementStepsService } from './completement_steps.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CompletementStepDto } from './dtos/completement_step.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserDto } from '../users/dtos/user.dto';

@Controller('completement-steps')
export class CompletementStepsController {
  constructor(private completementStepsService: CompletementStepsService) {}
  @Serialize(CompletementStepDto)
  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async getOrgList(@CurrentUser() user: UserDto) {
    if (user.userRole !== UserRoleEnum.USER_MANAGER) return [];
    return this.completementStepsService.getListByOrg(user.org.id);
  }
}
