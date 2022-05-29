import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  nats: {
    uri: process.env.NATS_URI_AUTH_SERVICE,
    queue: process.env.AUTH_SERVICE_NATS_QUEUE,
  },
}));
