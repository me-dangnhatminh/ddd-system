import { ErrorTypes, IErrorDetail } from '@common';
import { UserEmail } from '../../domain';

export type AuthErrorReason =
  | 'email.verification'
  | 'email.verification.invalid'
  | 'email.verification.expired'
  | 'email.verification.conflict'
  | 'email.verification.not.found'
  | 'token.invalid'
  | 'token.not-found';

export const INVALID_EMAIL: IErrorDetail = {
  reason: '',
  message: UserEmail.INVALID_MESSAGE,
};

export const CONFLICT_EMAIL: IErrorDetail = {
  reason: 'conflict-email',
  message: 'Email already exists',
};

export const INVALID_PASSWORD: IErrorDetail = {
  reason: 'invalid-password',
  message: 'Invalid password',
};

export const INVALID_EMAIL_OR_PASSWORD: IErrorDetail = {
  reason: 'invalid-email-or-password',
  message: 'Invalid email or password',
};

export const CONFLICT_VERIFIED_EMAIL: IErrorDetail = {
  reason: 'conflict-verified-email',
  message: 'Email is already verified',
};

export const INVALID_EMAIL_VERIFICATION: IErrorDetail = {
  reason: 'invalid-email-verification',
  message: 'Confirmation type has expired or is invalid',
};

export const INVALID_VERIFICATION_CODE: IErrorDetail = {
  reason: ErrorTypes.BAD_REQUEST,
  message: 'Invalid verification code',
};
