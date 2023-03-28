import {
  Controller,
  UseGuards,
  Get,
  Param,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AdminGuard } from '../guards/admin.guard';
import { UserDto } from '../users/dtos/user.dto';
import { AdminUsersService } from './admin_users.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { SendPointsToEmployeeDto } from './dtos/send_points _to_employee.dto';

@Serialize(UserDto)
@Controller('admin/users')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminUsersController {
  constructor(private adminUsersService: AdminUsersService) {}

  @Get('/:id')
  async getUserDetails(@Param('id') id: string) {
    return this.adminUsersService.getUserDetailsById(id);
  }

  @Post('/:id/send-points')
  async sendPointsToUser(
    @Param('id') id: string,
    @Body() body: SendPointsToEmployeeDto,
    @CurrentUser() user: User,
  ) {
    return this.adminUsersService.sendPointsToEmployee(
      id,
      user.id,
      body.amount,
      body.message,
    );
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string, @CurrentUser() admin: User) {
    return this.adminUsersService.deleteUser(id, admin.id);
  }
}
