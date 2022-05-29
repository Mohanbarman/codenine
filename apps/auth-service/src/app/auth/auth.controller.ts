import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  async register(data: Record<string, unknown>) {
    try {
      const res = await this.authService.register({
        email: data.email.toString(),
        name: data.name.toString(),
        password: data.password.toString(),
        profilePicture: data.profilePicture?.toString(),
      });
      return {
        data: {
          id: res.id,
          email: res.email,
          name: res.name,
          profilePicture: res.profilePicture,
          createdAt: res.createdAt,
          updatedAt: res.updatedAt,
        },
      };
    } catch (e) {
      throw new RpcException({ message: e.toString(), type: 'internal_error' });
    }
  }
}
