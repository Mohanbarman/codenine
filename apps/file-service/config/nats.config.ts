import { registerAs } from '@nestjs/config';

const namespace = 'nats';

export default registerAs(namespace, () => ({
  uri: process.env.NATS_URI || 'nats://localhost:4222',
}));

interface INatsConfig {
  uri: string;
}

export type NatsConfigPath = `${typeof namespace}.${keyof INatsConfig}`;
