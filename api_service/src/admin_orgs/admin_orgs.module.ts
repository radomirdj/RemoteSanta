import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LedgerModule } from '../ledger/ledger.module';
import { AdminOrgsController } from './admin_orgs.controller';
import { AdminOrgsService } from './admin_orgs.service';

@Module({
  imports: [PrismaModule, LedgerModule],
  controllers: [AdminOrgsController],
  providers: [AdminOrgsService],
})
export class AdminOrgsModule {}
