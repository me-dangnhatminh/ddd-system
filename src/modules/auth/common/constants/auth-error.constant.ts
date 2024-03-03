import * as shared from '@shared';

export enum AuthErrorType {
  EMAIL_OR_PASSWORD_INVALID = 'email-or-password-invalid',
  EMAIL_ALREADY_EXISTS = 'email-already-exists',
  PASSWORD_INCORRECT = 'password-incorrect',
  VERIFY_INVALID_CODE = 'verify-invalid-code',
  TOKEN_EXPIRED = 'token-expired',
}

export const EMAIL_OR_PASSWORD_INVALID: shared.IErrorDetail = {
  type: AuthErrorType.EMAIL_OR_PASSWORD_INVALID,
  title: 'Email or password is invalid.',
  detail: 'Check your email or password again.',
};

export const EMAIL_ALREADY_EXISTS: shared.IErrorDetail = {
  type: AuthErrorType.EMAIL_ALREADY_EXISTS,
  title: 'Email already exists.',
  detail: 'Email is already in use, please use another email.',
};

export const PASSWORD_INCORRECT: shared.IErrorDetail = {
  type: AuthErrorType.PASSWORD_INCORRECT,
  title: 'Password is incorrect.',
  detail: 'Check your password again or reset your password.',
};

export const VERIFY_INVALID_CODE: shared.IErrorDetail = {
  type: AuthErrorType.VERIFY_INVALID_CODE,
  title: 'Invalid verification code.',
  detail: 'Check your email and verification code again.',
};

export const TOKEN_EXPIRED: shared.IErrorDetail = {
  type: AuthErrorType.TOKEN_EXPIRED,
  title: 'Token is expired.',
  detail: 'Token is expired, please login again.',
};
