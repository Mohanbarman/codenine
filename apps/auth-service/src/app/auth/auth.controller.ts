import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  async register(data: Record<string, unknown>) {
    const res = await this.authService.register({
      email: data.email?.toString(),
      name: data.name?.toString(),
      password: data.password?.toString(),
      profilePicture: data.profilePicture?.toString(),
    });
    return {
      id: res.id,
      email: res.email,
      name: res.name,
      profilePicture: res.profilePicture,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
    };
  }

  @MessagePattern('auth.login')
  async login(data: Record<string, unknown>) {
    const res = await this.authService.login(
      data.email?.toString(),
      data.password?.toString()
    );
    return res;
  }

  @MessagePattern('auth.getMe')
  async getMe(data: Record<string, unknown>) {
    const res = await this.authService.verifyToken(data.token?.toString());
    return res;
  }
}
