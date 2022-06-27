import { RpcException } from '@nestjs/microservices';

export enum RpcExceptionSeverity {
  LOW,
  NORMAL,
  HIGH,
  CRITICAL,
}

export const buildRpcException = (args: {
  code: string;
  severity: RpcExceptionSeverity;
}) => {
  const { code, severity } = args;
  const rpcException = new RpcException({ code, severity });
  return rpcException;
};
