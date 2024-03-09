import * as shared from '@shared';

export enum AuthErrorType {
  INVALID_CREDENTIALS = 'invalid-credentials',
  NOT_LOGGED_IN = 'not-logged-in',
  EMAIL_CONFLICT = 'email-conflict',
  PASSWORD_INCORRECT = 'password-incorrect',
  VERIFY_INVALID_CODE = 'verify-invalid-code',
  TOKEN_EXPIRED = 'token-expired',
  ALREADY_VERIFIED = 'already-verified',
  CODE_REQUIRED_FOR_CONFIRMATION = 'code-required-confirmation',
}

export const INVALID_CREDENTIALS: shared.IErrorDetail = {
  type: AuthErrorType.INVALID_CREDENTIALS,
  title: 'Invalid credentials.',
  detail: 'Check your email or password again.',
};

export const EMAIL_CONFLICT: shared.IErrorDetail = {
  type: AuthErrorType.EMAIL_CONFLICT,
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

export const NOT_LOGGED_IN: shared.IErrorDetail = {
  type: AuthErrorType.NOT_LOGGED_IN,
  title: 'Not logged in.',
  detail: 'Please login to access this resource.',
};

export const ALREADY_VERIFIED: shared.IErrorDetail = {
  type: AuthErrorType.ALREADY_VERIFIED,
  title: 'Already verified.',
  detail: 'Your email is already verified.',
};

export const CODE_REQUIRED_FOR_CONFIRMATION: shared.IErrorDetail = {
  type: AuthErrorType.CODE_REQUIRED_FOR_CONFIRMATION,
  title: 'Code is required.',
  detail: 'Code is required for email confirmation (act is "conf").',
};
