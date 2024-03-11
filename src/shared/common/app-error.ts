import { IErrorDetail, IValidationError, IInvalidParam } from './interfaces';

export class AppError extends Error implements IErrorDetail {
  constructor(
    public type: string,
    public title: string,
    public detail: string,
  ) {
    super(detail);
  }

  static unknown(
    type = 'about:blank',
    title = 'An unknown error occurred.',
    detail = 'An unknown error occurred.',
  ): AppError {
    return new AppError(type, title, detail);
  }

  static fromError(detail: IErrorDetail): AppError {
    return new AppError(detail.type, detail.title, detail.detail);
  }
}

export class ValidationError extends AppError implements IValidationError {
  constructor(
    public type: string,
    public title: string,
    public detail: string,
    public errors: IInvalidParam[],
  ) {
    super(type, title, detail);
  }

  static fromError(detail: IValidationError): ValidationError {
    return new ValidationError(
      detail.type,
      detail.title,
      detail.detail,
      detail.errors,
    );
  }
}
