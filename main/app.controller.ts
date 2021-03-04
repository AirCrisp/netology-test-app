import { Controller, Request, Post, UseGuards, Body, Get, Session, UseFilters, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { AuthFilter } from './auth/auth.filter';
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
  @UseFilters(new AuthFilter)
  test(@Session() session: Record<string, any>) {
    return session.user;
  }

  @Get('counter/:bookId')
  async count(@Param('bookId') bookId: string) {
    const store = JSON.parse( await fs.readFile(resolve(__dirname + '/vol/db.json'), 'utf-8') );
    if (!store[bookId]) {
      store[bookId] = 1;
    } else store[bookId]++;
    await fs.writeFile(resolve(__dirname + '/vol/db.json'), JSON.stringify(store));
    return store[bookId];
  }
}