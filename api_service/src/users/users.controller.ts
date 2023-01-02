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
import { LedgerService } from '../ledger/ledger.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { ChangePasswordUserDto } from '../users/dtos/change-password.dto';
import { ForgotPasswordUserDto } from '../users/dtos/forgot-password-user.dto';
import { ConfirmPasswordUserDto } from '../users/dtos/confirm-password-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AwsCognitoService } from './aws-cognito/aws-cognito.service';
import { CognitoException } from '../errors/cognitoException';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private awsCognitoService: AwsCognitoService,
    private ledgerService: LedgerService,
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
    try {
      await this.awsCognitoService.changeUserPassword(changePasswordUserDto);
    } catch (err) {
      throw new CognitoException(err.message);
    }
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() forgotPasswordUserDto: ForgotPasswordUserDto) {
    let response;
    try {
      response = await this.awsCognitoService.forgotUserPassword(
        forgotPasswordUserDto,
      );
    } catch (err) {
      throw new CognitoException(err.message);
    }
    return response;
  }

  @Post('/confirm-password')
  async confirmPassword(
    @Body() confirmPasswordUserDto: ConfirmPasswordUserDto,
  ) {
    let response;
    try {
      response = await this.awsCognitoService.confirmUserPassword(
        confirmPasswordUserDto,
      );
    } catch (err) {
      throw new CognitoException(err.message);
    }
    return response;
  }

  @Get('/self')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@CurrentUser() user: User) {
    const userBalance = await this.ledgerService.getUserBalance(user.id);
    return {
      ...user,
      userBalance,
    };
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
