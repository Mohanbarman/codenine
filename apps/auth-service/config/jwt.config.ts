import { registerAs } from '@nestjs/config';

const namespace = 'jwt';

export const jwtConfig = registerAs(namespace, () => ({
  secret: process.env.JWT_SECRET || 'secret',
}));

export type JWTConfigPath = `${typeof namespace}.${keyof ReturnType<
  typeof jwtConfig
>}`;
