import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `${__dirname}/db/mydb.sqlite`,
      entities: [ User ],
      logging: true,
      synchronize: true
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
