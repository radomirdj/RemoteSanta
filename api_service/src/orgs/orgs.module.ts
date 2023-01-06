import { Module } from '@nestjs/common';
import { OrgsController } from './orgs.controller';
import { AdminOrgsModule } from '../admin_orgs/admin_orgs.module';

@Module({
  imports: [AdminOrgsModule],
  controllers: [OrgsController],
})
export class OrgsModule {}
