import { buildRpcException, RpcExceptionSeverity } from '@codenine/nestlib';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TConfigPath } from '../../../config';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { UserTransformer } from '../../transformers';
import { passwordManager } from '../../utilities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async register(user: Partial<IUser>): Promise<IUser> {
    Logger.debug('Registering user', user.email);
    if (await this.userService.getByEmail(user.email)) {
      Logger.debug('User already exists', user.email);
      throw buildRpcException({
        code: 'email_already_exists',
        severity: RpcExceptionSeverity.LOW,
      });
    }
    Logger.debug('User registered', user.email)
    return this.userService.create(user);
  }

  async login(email: string, password: string): Promise<Record<string, any>> {
    const user = await this.userService.getByEmail(email);
    Logger.log('Login user', user.email);
    if (!user) {
      Logger.debug('User not found', user.email)
      throw buildRpcException({
        code: 'invalid_credentials',
        severity: RpcExceptionSeverity.LOW,
      });
    }

    const isPasswordCorrect = await passwordManager.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      Logger.debug('Wrong password', user.email)
      throw buildRpcException({
        code: 'invalid_credentials',
        severity: RpcExceptionSeverity.LOW,
      });
    }

    const jwtSecret = this.configService.get('jwt.secret' as TConfigPath);

    const accessToken = jwt.sign(
      { sub: user.id, scope: 'access_token' },
      jwtSecret,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      { sub: user.id, scope: 'refresh_token' },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return { ...UserTransformer.serializeOne(user), accessToken, refreshToken };
  }

  async verifyToken(token: string): Promise<Record<string, unknown>> {
    const jwtSecret = this.configService.get('jwt.secret' as TConfigPath);

    let payload;
    try {
      payload = jwt.verify(token, jwtSecret);
    } catch (e) {
      console.log(e);
    }
    if (typeof payload == 'string' || payload.scope != 'access_token') {
      throw buildRpcException({
        code: 'invalid_token',
        severity: RpcExceptionSeverity.LOW,
      });
    }

    const user = await this.userService.getById(payload.sub.toString());

    if (!user) {
      throw buildRpcException({
        code: 'invalid_token',
        severity: RpcExceptionSeverity.LOW,
      });
    }

    return UserTransformer.serializeOne(user);
  }
}
