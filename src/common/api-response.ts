import { IErrorResponse } from './interfaces/error-response.interface';

export class ApiResponse<
  TData = undefined,
  TError extends IErrorResponse = IErrorResponse,
> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly data?: TData,
    public readonly error?: TError,
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
  static success<TData>(data: TData): ApiResponse<TData, any>;
  static success<TData>(data?: TData): ApiResponse<TData, any> {
    return new ApiResponse<TData, any>(true, data);
  }

  static error(): ApiResponse<undefined, IErrorResponse>;
  static error<TError extends IErrorResponse>(
    error: TError,
  ): ApiResponse<undefined, TError>;
  static error<TError extends IErrorResponse>(
    error?: TError,
  ): ApiResponse<undefined, TError> {
    return new ApiResponse<any, TError>(false, undefined, error);
  }
}
