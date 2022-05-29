import { HttpException, HttpStatus } from '@nestjs/common';

export const throwHttpException = (data: {
  status: HttpStatus;
  message?: string;
  errors?: Record<string, any>;
}): void => {
  throw new HttpException(
    {
      message: data.message,
      errors: data.errors,
    },
    data.status,
  );
};
