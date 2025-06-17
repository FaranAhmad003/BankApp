import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { Session } from 'express-session';

// Add this interface
interface CustomSession extends Session {
  user?: any; // or define a proper User type if you have one
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    (req.session as any).user = user; // store in session
    return { message: 'Logged in successfully', user };
  }

  @Get('me')
  me(@Req() req: Request & { session: CustomSession }) {
    return req.session?.user || null;
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.send({ message: 'Logged out' });
    });
  }
}
