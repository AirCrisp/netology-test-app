import { Controller, Get, Param } from '@nestjs/common';
import { promises as fs } from 'fs';
import { resolve } from 'path';

@Controller()
export class AppController {
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