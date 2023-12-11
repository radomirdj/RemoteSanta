import { Module } from '@nestjs/common';
import { SecretSantaTrialController } from './secret_santa_trial.controller';
import { SecretSantaTrialService } from './secret_santa_trial.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailsModule } from '../emails/emails.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, EmailsModule, UsersModule],
  controllers: [SecretSantaTrialController],
  providers: [SecretSantaTrialService],
})
export class SecretSantaTrialModule {}
