import { ErrorTypes, IErrorDetail } from '@common';
import { UserEmail } from '../../domain';

export type AuthErrorType =
  | 'invalid-email'
  | 'invalid-password'
  | 'invalid-email-or-password'
  | 'conflict-email'
  | 'conflict-verified-email'
  | 'invalid-email-verification-type'
  | 'invalid-verification-code';

export const INVALID_EMAIL: IErrorDetail = {
  type: 'invalid-email',
  message: UserEmail.INVALID_MESSAGE,
};

export const CONFLICT_EMAIL: IErrorDetail = {
  type: ErrorTypes.CONFLICT,
  message: 'Email already exists',
};

export const INVALID_PASSWORD: IErrorDetail = {
  type: ErrorTypes.BAD_REQUEST,
  message: 'Invalid password',
};

export const INVALID_EMAIL_OR_PASSWORD: IErrorDetail = {
  type: ErrorTypes.UNAUTHORIZED,
  message: 'Invalid email or password',
};

export const CONFLICT_VERIFIED_EMAIL: IErrorDetail = {
  type: ErrorTypes.CONFLICT,
  message: 'Email is already verified',
};

export const INVALID_EMAIL_VERIFICATION_type: IErrorDetail = {
  type: ErrorTypes.FORBIDDEN,
  message: 'Confirmation type has expired or is invalid',
};

export const INVALID_VERIFICATION_CODE: IErrorDetail = {
  type: ErrorTypes.BAD_REQUEST,
  message: 'Invalid verification code',
};
