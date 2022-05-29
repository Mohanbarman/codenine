import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../user/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(user: Partial<IUser>): Promise<IUser> {
    if (await this.userService.getById(user.id)) {
      throw new RpcException({
        message: 'User already exists',
        type: 'user_already_exists',
        severity: 0,
      });
    }
    return this.userService.create(user);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = await user.validatePassword(password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ sub: user.id }, 'secret', { expiresIn: '1h' });
    return token;
  }

  async getUserByToken(token: string): Promise<Partial<IUser>> {
    try {
      const payload: jwt.JwtPayload = await new Promise((resolve, reject) => {
        jwt.verify(token, 'secret', (err, decoded) => {
          if (err) reject(err);
          if (typeof decoded == 'string') reject('Invalid token');
          else resolve(decoded);
        });
      });

      if (typeof payload == 'string') {
        throw new Error('Invalid token');
      }

      if (!payload.sub) {
        return null;
      }

      const user = await this.userService.getById(payload.sub.toString());

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        profilePicture: user.profilePicture,
      };
    } catch (e) {
      throw new Error('Invalid token');
    }
  }
}
