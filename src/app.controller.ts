import { Controller, Request, Post, UseGuards, Body, Get, Session } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from './users/user.dto';
import { UserGuard } from './users/user.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private usersService: UsersService) {}
  @UseGuards(AuthGuard('local'))
  @Get('auth/login')
  async login(@Session() session: Record<string, any>, @Request() req) {
    session.user = req.user;
    return session.user;
  }

  @Post('user')
  async createUser(@Body() user: CreateUserDTO) {
    return this.usersService.createOne(user);
  }

  @Get('test')
  @UseGuards(UserGuard)
  test(@Session() session: Record<string, any>) {
    return session.user;
  }
}