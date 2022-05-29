import { registerAs } from '@nestjs/config';

const namespace = 'db';

export default registerAs(namespace, () => ({
  uri: process.env.DB_URI,
}));

export interface IDatabaseConfig {
  uri: string;
}
export type DatabaseConfigPath = `${typeof namespace}.${keyof IDatabaseConfig}`;
