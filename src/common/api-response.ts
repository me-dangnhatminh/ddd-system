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
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A successful response cannot contain an error.',
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: An unsuccessful response must contain an error.',
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
}
