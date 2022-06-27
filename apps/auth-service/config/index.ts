import { DatabaseConfigPath, dbConfig } from './database.config';
import { NatsConfigPath, natsConfig } from './nats.config';
import { JWTConfigPath, jwtConfig } from './jwt.config';

export type TConfigPath = NatsConfigPath | DatabaseConfigPath | JWTConfigPath;

export default [natsConfig, dbConfig, jwtConfig];
