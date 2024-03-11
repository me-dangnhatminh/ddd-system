/**
 * Error Detail Interface - https://datatracker.ietf.org/doc/html/rfc7807
 */
export interface IErrorDetail {
  type: string;
  title: string;
  detail: string;
}

export interface IInvalidParam {
  name: string;
  reason: string;
}

export interface IValidationError extends IErrorDetail {
  errors: IInvalidParam[];
}
