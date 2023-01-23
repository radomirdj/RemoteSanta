import { Module } from '@nestjs/common';
import { OrgsController } from './orgs.controller';
import { AdminOrgsModule } from '../admin_orgs/admin_orgs.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [AdminOrgsModule, UsersModule],
  controllers: [OrgsController],
})
export class OrgsModule {}
