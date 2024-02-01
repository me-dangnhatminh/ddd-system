import { IErrorResponse } from './interfaces/error-response.interface';

export class ApiResponse<
  BaseData = undefined,
  BaseError extends IErrorResponse = IErrorResponse,
> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly data?: BaseData,
    public readonly error?: BaseError,
  ) {
    if (isSuccess && Boolean(error)) {
      throw new Error(
        'InvalidOperation: A successful response cannot contain an error.',
      );
    }
  }

  static success(): ApiResponse<undefined, any>;
  static success<T>(data: T): ApiResponse<T, any>;
  static success<T>(data?: T): ApiResponse<T, any> {
    return new ApiResponse<T, any>(true, data);
  }

  static error(): ApiResponse<undefined, IErrorResponse>;
  static error<E extends IErrorResponse>(error: E): ApiResponse<undefined, E>;
  static error<E extends IErrorResponse>(error?: E): ApiResponse<undefined, E> {
    return new ApiResponse<any, E>(false, undefined, error);
  }

  getErrorDisplay(): string {
    if (!this.error)
      throw new Error(
        'InvalidOperation: No error to display, please check the error property.',
      );
    return `[#${this.error.code}] ${this.error.type}: ${this.error.message}`;
  }
}
