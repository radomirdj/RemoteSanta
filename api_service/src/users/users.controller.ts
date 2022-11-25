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

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthLoginUserDto } from './dtos/auth-login-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { ChangePasswordUserDto } from '../users/dtos/change-password.dto';
import { ForgotPasswordUserDto } from '../users/dtos/forgot-password-user.dto';
import { ConfirmPasswordUserDto } from '../users/dtos/confirm-password-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { AwsCognitoService } from './aws-cognito/aws-cognito.service';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private awsCognitoService: AwsCognitoService,
  ) {}

  // Cognito
  @Post('/signup')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/login')
  async login(@Body() authLoginUserDto: AuthLoginUserDto) {
    return await this.awsCognitoService.authenticateUser(authLoginUserDto);
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

  //   @Post('/signin')
  //   async signinUser(@Body() body: CreateUserDto, @Session() session: any) {
  //     const user = await this.authService.signin(body.email, body.password);
  //     session.userId = user.id;
  //     return user;
  //   }

  @Get('/self')
  @UseGuards(AuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}
