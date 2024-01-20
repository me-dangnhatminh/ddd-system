export class ApiResponse<TData, TError> {
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

  static success<TData>(data: TData) {
    return new ApiResponse<TData, any>(true, data);
  }

  static error<TError>(error: TError) {
    return new ApiResponse<any, TError>(false, undefined, error);
  }
}
