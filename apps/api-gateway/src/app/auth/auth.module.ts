import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE_CLIENT } from '../constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AUTH_SERVICE_CLIENT,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [configService.get<string>('auth.nats.uri')],
            queue: configService.get<string>('auth.nats.queue'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
