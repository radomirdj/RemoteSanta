import {
  Controller,
  Get,
  UseGuards,
  Post,
  Param,
  Body,
  Headers,
  Req,
  RawBodyRequest,
} from '@nestjs/common';
import { UserRoleEnum } from '@prisma/client';
import { CompletementStepsService } from './completement_steps.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CompletementStepDto } from './dtos/completement_step.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserDto } from '../users/dtos/user.dto';
import { UserManagerGuard } from '../guards/user_manager.guard';
import { CompletementStepStatusUpdateDto } from './dtos/completement_step_status_update.dto';
import { SetSignupBonusCompletementStepDto } from './dtos/set_signup_bonus_completment_step';
import { SetPersonalDetailsCompletementStepDto } from './dtos/set_personal_details_completment_step';
import { PurchasePointsCompletementStepDto } from './dtos/purchase_points_completment_step';
import { SetBirthdayConfigCompletementStepDto } from './dtos/set_birthday_config_completment_step';
import { PaymentsService } from '../payments/payments.service';
import consts from '../utils/consts';

@Controller('completement-steps')
@Serialize(CompletementStepDto)
export class CompletementStepsController {
  constructor(
    private paymentsService: PaymentsService,
    private completementStepsService: CompletementStepsService,
  ) {}

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

  @Post('/set-signup-bonus')
  @UseGuards(AuthGuard('jwt'), UserManagerGuard)
  async setSignupBonusCompletementStep(
    @CurrentUser() user: UserDto,
    @Body() body: SetSignupBonusCompletementStepDto,
  ) {
    return this.completementStepsService.updateOrgSignupBonus(
      user.org.id,
      body.signupPoints,
    );
  }

  @Post('/set-personal-details')
  @UseGuards(AuthGuard('jwt'), UserManagerGuard)
  async setPersonalDetailsCompletementStep(
    @CurrentUser() user: UserDto,
    @Body() body: SetPersonalDetailsCompletementStepDto,
  ) {
    return this.completementStepsService.updatePersonalDetails(
      user.org.id,
      user.id,
      body.gender,
      body.birthDate,
    );
  }

  // WARNING!!! - THIS ENDPOINT IS NOT COVERED WITH TESTS
  @Post('/purchase-points')
  @UseGuards(AuthGuard('jwt'), UserManagerGuard)
  async purchasePointsCompletementStep(
    @CurrentUser() user: UserDto,
    @Body() body: PurchasePointsCompletementStepDto,
  ) {
    return this.completementStepsService.purchasePoints(
      user,
      body.purchasePoints,
    );
  }

  // WARNING!!! - THIS ENDPOINT IS NOT COVERED WITH TESTS
  @Post('/stripe-webhook')
  async purchasePoinstripeWebhooktsCompletementStep(
    @Headers() headers,
    @Req() req: RawBodyRequest<Request>,
  ) {
    const sig = headers['stripe-signature'];
    const completedPaymentOrgId =
      await this.paymentsService.handleStripeWebhook(req.rawBody, sig);
    if (completedPaymentOrgId)
      await this.completementStepsService.updateOrgCompletementStatus(
        completedPaymentOrgId,
        consts.orgCompletementSteps.PURCHASE_POINTS.id,
        true,
      );
  }

  @Post('/set-birthdays-config')
  @UseGuards(AuthGuard('jwt'), UserManagerGuard)
  async setBirthdaysConfigCompletementStep(
    @CurrentUser() user: UserDto,
    @Body() body: SetBirthdayConfigCompletementStepDto,
  ) {
    return this.completementStepsService.setBirthdaysConfig(user, body);
  }
}
