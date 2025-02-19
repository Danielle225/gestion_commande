import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { phoneNumber: string; password: string }) {
    return await this.authService.register(body.phoneNumber, body.password);
  }

  @Post('login')
  async login(@Body() body: { phoneNumber: string; password: string }) {
    return await this.authService.login(body.phoneNumber, body.password);
  }
}
