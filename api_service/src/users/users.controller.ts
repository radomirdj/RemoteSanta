import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { ChangePasswordUserDto } from '../users/dtos/change-password.dto';
import { ForgotPasswordUserDto } from '../users/dtos/forgot-password-user.dto';
import { ConfirmPasswordUserDto } from '../users/dtos/confirm-password-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AwsCognitoService } from './aws-cognito/aws-cognito.service';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private awsCognitoService: AwsCognitoService,
  ) {}

  @Post('/signup')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('/change-password')
  async changePassword(@Body() changePasswordUserDto: ChangePasswordUserDto) {
    await this.awsCognitoService.changeUserPassword(changePasswordUserDto);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() forgotPasswordUserDto: ForgotPasswordUserDto) {
    return await this.awsCognitoService.forgotUserPassword(
      forgotPasswordUserDto,
    );
  }

  @Post('/confirm-password')
  async confirmPassword(
    @Body() confirmPasswordUserDto: ConfirmPasswordUserDto,
  ) {
    return await this.awsCognitoService.confirmUserPassword(
      confirmPasswordUserDto,
    );
  }

  @Get('/self')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  //   @Post('/signout')
  //   async signOut(@Session() session: any) {
  //     session.userId = null;
  //   }

  //   @Patch('/:id')
  //   updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
  //     return this.usersService.update(id, body);
  //   }
}
