import { registerAs } from '@nestjs/config';

const namespace = 'nats';

export const natsConfig = registerAs(namespace, () => ({
  uri: process.env.NATS_URI || 'nats://localhost:4222',
  queue: process.env.NATS_Q || 'auth_service',
}));

export type NatsConfigPath = `${typeof namespace}.${keyof ReturnType<
  typeof natsConfig
>}`;
