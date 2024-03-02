import { ErrorTypes } from './constants';
import { IErrorDetail } from './interfaces';

export class UnknownError extends Error implements IErrorDetail {
  public code = 0;
  public type = ErrorTypes.UNKNOWN;

  constructor(message?: string) {
    super(message);
  }
}

export class ValidationError extends Error implements IErrorDetail {
  public code = 1;
  public type = ErrorTypes.VALIDATION_FAILED;

  constructor(message?: string) {
    super(message);
  }
}

export class NotFoundError extends Error implements IErrorDetail {
  public code = 2;
  public type = ErrorTypes.NOT_FOUND;

  constructor(message?: string) {
    super(message);
  }
}

export class PreconditionFailedError extends Error implements IErrorDetail {
  public code = 3;
  public type = ErrorTypes.PRECONDITION_FAILED;

  constructor(message?: string) {
    super(message);
  }
}

export class PermissionDeniedError extends Error implements IErrorDetail {
  public code = 4;
  public type = ErrorTypes.PERMISSION_DENIED;

  constructor(message?: string) {
    super(message);
  }
}

class UserDomainDemo {
  public new() {
    if (false) throw new UnknownError('Unknown error');
  }
}
