import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import config, { TConfigPath } from '../../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [configService.get<string>('nats.uri' as TConfigPath)],
            queue: 'auth_service'
          },
        });
      },
      inject: [ConfigService],
    },
    AppService,
  ],
  controllers: [AppController],
})
export class AppModule {}
