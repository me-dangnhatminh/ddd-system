/**
 * Error Detail Interface - https://datatracker.ietf.org/doc/html/rfc7807
 */

import { CommonErrorType } from '../constants';

export interface IErrorDetail {
  type: string;
  title: string;
  detail: string;
}

export interface IValidationErrorParam {
  name: string;
  reason: string;
}

export interface IValidationError extends IErrorDetail {
  type: CommonErrorType.VALIDATION_ERROR;
  title: "Your request parameters didn't validate.";
  invalidParams: IValidationErrorParam[];
}

export interface IInternalError extends IErrorDetail {
  type: CommonErrorType.INTERNAL;
  title: 'An internal error occurred.';
}
