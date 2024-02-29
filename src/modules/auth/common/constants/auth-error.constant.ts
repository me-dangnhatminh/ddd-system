import {
  AuthorizationError,
  ConflictError,
  Exception,
  ValidationError,
} from '@common';

export enum AuthErrorCode {
  EMAIL_VALIDATION = 'email.validation',
  EMAIL_VALIDATION_INVALID = 'email.validation.invalid',
  EMAIL_TOKEN_EXPIRED = 'email.token.expired',
  EMAIL_CONFLICT = 'email.conflict',
  PASSWORD_INVALID = 'password.invalid',
  EMAIL_OR_PASSWORD_INVALID = 'email.or.password.invalid',
}

export const AuthError: Record<AuthErrorCode, Exception> = {
  [AuthErrorCode.EMAIL_VALIDATION]: new ValidationError(
    AuthErrorCode.EMAIL_VALIDATION,
    'Email is not valid',
  ),
  [AuthErrorCode.EMAIL_VALIDATION_INVALID]: new ValidationError(
    AuthErrorCode.EMAIL_VALIDATION_INVALID,
    'Email is not valid',
  ),
  [AuthErrorCode.EMAIL_TOKEN_EXPIRED]: new ValidationError(
    AuthErrorCode.EMAIL_TOKEN_EXPIRED,
    'Email token is expired',
  ),
  [AuthErrorCode.EMAIL_CONFLICT]: new ConflictError(
    AuthErrorCode.EMAIL_CONFLICT,
    'Email is already in use',
  ),
  [AuthErrorCode.PASSWORD_INVALID]: new ValidationError(
    AuthErrorCode.EMAIL_VALIDATION,
    'Email is not valid',
  ),
  [AuthErrorCode.EMAIL_OR_PASSWORD_INVALID]: new AuthorizationError(
    AuthErrorCode.EMAIL_VALIDATION,
    'Email is not valid',
  ),
};
