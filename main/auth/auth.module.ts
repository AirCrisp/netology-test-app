import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'main/users/users.module';
import { LocalStrategy } from './auth.local.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
