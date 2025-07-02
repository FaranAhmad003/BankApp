import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  Req,
  Res,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'lucide-react';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    if(!body.email || !body.password)
    {
      return {message : "Enter Email or Passwords"};
    }
    const user = await this.authService.signup(body.email, body.password);
    if(!user)
    {
      return {message : "Invalid Credentials"};
    }
    const token = await this.authService.generateJwt(user);
    return {message: "Logged in Successfully"}

    return this.authService.signup(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    const token = await this.authService.generateJwt(user);
    return { message: 'Logged in successfully', token };
  }

  @Get('me')
  async me(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { message: 'No token provided' };
    }
    const token = authHeader.split(' ')[1];
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return { id: payload.sub, email: payload.email };
    } catch (e) {
      return { message: 'Invalid or expired token' };
    }
  }

  @Get('logout')
  logout() {
    return { message: 'Logged out (stateless, delete token on client)' };
  }
}
