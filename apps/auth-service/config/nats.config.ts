import { registerAs } from '@nestjs/config';

const namespace = 'nats';

export default registerAs(namespace, () => ({
  uri: process.env.NATS_URI || 'nats://localhost:4222',
  queue: process.env.NATS_Q || 'auth_service'
}));

interface INatsConfig {
  uri: string;
  queue: string;
}

export type NatsConfigPath = `${typeof namespace}.${keyof INatsConfig}`;
