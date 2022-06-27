import { Body, Controller, Get, Post, Req, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { CustomValidationPipe, ErrorHandler } from '@codenine/nestlib';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new CustomValidationPipe())
  async register(@Body() registerDto: RegisterDTO) {
    try {
      const res = await this.authService.register({
        email: registerDto.email,
        name: registerDto.name,
        password: registerDto.password,
        profilePicture: registerDto.profilePicture,
      });
      return { success: true, data: res };
    } catch (e) {
      const errorHandler = new ErrorHandler();

      errorHandler.register({
        code: 'email_already_exists',
        statusCode: 409,
        errors: {
          email: ['Email already exists'],
        },
      });

      errorHandler.handle(e);
    }
  }

  @Post('login')
  @UsePipes(new CustomValidationPipe())
  async login(@Body() loginDto: LoginDTO) {
    try {
      const res = await this.authService.login({
        email: loginDto.email,
        password: loginDto.password,
      });
      return { success: true, data: res };
    } catch (e) {
      const errorHandler = new ErrorHandler();

      errorHandler.register({
        code: 'invalid_credentials',
        statusCode: 401,
        errors: {
          email: ['Invalid credentials'],
        },
      });

      errorHandler.handle(e);
    }
  }

  @Get('me')
  async getMe(@Req() req: Request) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const res = await this.authService.getMe(token);
      return { success: true, data: res };
    } catch (e) {
      const errorHandler = new ErrorHandler();

      errorHandler.register({
        code: 'invalid_token',
        statusCode: 401,
        message: 'Expired or invalid token',
      });

      errorHandler.handle(e);
    }
  }
}
