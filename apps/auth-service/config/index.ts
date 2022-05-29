import databaseConfig, { DatabaseConfigPath } from './database.config';
import natsConfig, { NatsConfigPath } from './nats.config';

export type TConfigPath = NatsConfigPath | DatabaseConfigPath;

export default [natsConfig, databaseConfig];
