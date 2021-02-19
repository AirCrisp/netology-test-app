import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from './users/user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private usersService: UsersService) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('user')
  async createUser(@Body() user: CreateUserDTO) {
    return this.usersService.createOne(user);
  }
}