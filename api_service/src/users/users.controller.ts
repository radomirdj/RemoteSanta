import { Controller, Post, Body, Get, Patch, Param, Query, Delete, NotFoundException, Session, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from './dtos/creaate-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService){}

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signinUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/self')
    @UseGuards(AuthGuard)
    async getCurrentUser(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signout')
    async signOut(@Session() session: any) {
        session.userId = null;
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(id);
        if(!user) { throw new NotFoundException('User Not Found'); }
        return user;
    }

    @Get('')
    findAllUser(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(id, body);
    }
}
