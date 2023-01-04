import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AdminGuard } from '../guards/admin.guard';
import { UserDto } from '../users/dtos/user.dto';
import { AdminUsersService } from './admin_users.service';

@Serialize(UserDto)
@Controller('admin/users')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminUsersController {
  constructor(private adminUsersService: AdminUsersService) {}

  @Get('/:id')
  async getOrgDetails(@Param('id') id: string) {
    return this.adminUsersService.getUserDetailsById(id);
  }
}
