import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';




@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: '3ujO0b2cjAa2sP5XyUNuwISpMCfXNky3PGXuYUJtjvo=',
    signOptions: {expiresIn: '1h'},
  })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
