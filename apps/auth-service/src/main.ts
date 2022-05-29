import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  console.log(process.env.NATS_Q);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        url: [process.env.NATS_URI || 'nats://localhost:4222'],
        queue: process.env.NATS_Q,
      },
    }
  );
  app.listen();
}

bootstrap();
