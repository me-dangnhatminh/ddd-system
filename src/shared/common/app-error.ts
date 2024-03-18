import { IErrorDetail, IValidationError } from './interfaces';

export class AppError<T extends IErrorDetail = IErrorDetail> extends Error {
  constructor(public readonly error: T) {
    super(error.detail);
  }

  static new<T extends IErrorDetail>(error: T): AppError<T> {
    return new AppError(error);
  }

  static unknown(
    type = 'auto:blank',
    title = 'An unknown error occurred',
    detail = 'An unknown error occurred',
  ): AppError<IErrorDetail> {
    return new AppError({ type, title, detail });
  }

  static validationError<T extends IValidationError>(error: T): AppError<T> {
    return new AppError<T>(error);
  }
}
