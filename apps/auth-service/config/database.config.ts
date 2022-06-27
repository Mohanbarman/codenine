import { registerAs } from '@nestjs/config';

const namespace = 'db';

export const dbConfig = registerAs(namespace, () => ({
  uri: process.env.DB_URI,
}));

export type DatabaseConfigPath = `${typeof namespace}.${keyof ReturnType<
  typeof dbConfig
>}`;
