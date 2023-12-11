import { Controller, UseGuards, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserManagerGuard } from '../guards/user_manager.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserDto } from '../users/dtos/user.dto';
import { SecretSantaTrialService } from './secret_santa_trial.service';

@Controller('secret-santa-trial')
export class SecretSantaTrialController {
  constructor(private secretSantaTrialService: SecretSantaTrialService) {}
  @Post('/activate')
  @UseGuards(AuthGuard('jwt'), UserManagerGuard)
  async activateSecretSantaTrial(@CurrentUser() user: UserDto) {
    await this.secretSantaTrialService.activateSecretSantaTrial(user);
  }
}
