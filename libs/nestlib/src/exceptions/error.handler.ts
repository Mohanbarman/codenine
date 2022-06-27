import { HttpException } from '@nestjs/common';

export interface IErrorData {
  code: string;
  statusCode: number;
  data?: Record<string, unknown>;
  message?: string;
  errors?: Record<string, string[]>;
}

export class ErrorHandler {
  errors: Record<string, IErrorData>;

  constructor() {
    this.errors = {};
    this.errors.default = {
      code: 'default',
      statusCode: 500,
      message: 'Internal server error',
    };
  }

  register(value: IErrorData) {
    this.errors[value.code] = value;
  }

  private buildError(error: IErrorData) {
    return {
      success: false,
      ...(error.data || {}),
      ...(error.message ? { message: error.message } : {}),
      ...(error.errors ? { errors: error.errors } : {}),
    };
  }

  handle(e: IErrorData) {
    if (e.code in this.errors) {
      const errorData = this.buildError(this.errors[e.code]);
      throw new HttpException(errorData, this.errors[e.code].statusCode);
    }
    const errorData = this.buildError(this.errors.default);
    throw new HttpException(errorData, 500);
  }
}
