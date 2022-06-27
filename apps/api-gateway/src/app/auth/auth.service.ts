import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE_CLIENT } from '../constants';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE_CLIENT) private client: ClientProxy) {}

  async register(data: RegisterDTO): Promise<Record<string, unknown>> {
    const res = await firstValueFrom(this.client.send('auth.register', data));
    return res;
  }

  async login(data: LoginDTO): Promise<Record<string, unknown>> {
    const res = await firstValueFrom(this.client.send('auth.login', data));
    return res;
  }

  async getMe(data: string): Promise<Record<string, unknown>> {
    const res = await firstValueFrom(
      this.client.send('auth.getMe', { token: data })
    );
    return res;
  }
}
