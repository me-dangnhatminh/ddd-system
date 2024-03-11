import { AppError, IValidationError } from '@shared';
import { AuthErrorType } from './constants/auth-error-type.constant';

export class AuthError extends AppError {
  constructor(type: AuthErrorType, title: string, detail: string) {
    super(type, title, detail);
  }
}

export class AuthValidationError extends AuthError implements IValidationError {
  constructor(
    public type: AuthErrorType,
    public title: string,
    public detail: string,
    public errors: { name: string; reason: string }[],
  ) {
    super(type, title, detail);
  }
}

// Not enough accounts

