import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminOrgsController } from './admin_orgs.controller';
import { AdminOrgsService } from './admin_orgs.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminOrgsController],
  providers: [AdminOrgsService],
})
export class AdminOrgsModule {}
