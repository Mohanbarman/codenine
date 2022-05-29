import { HttpException, HttpStatus } from '@nestjs/common';

export const throwValidationException = (
  errors: Record<string, string[]>,
): void => {
  if (Object.keys(errors).length > 0) {
    throw new HttpException(
      {
        message: 'Validation failed',
        errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
};
