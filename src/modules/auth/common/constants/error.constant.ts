import { ErrorTypes, IErrorDetail } from '@common';

export const CONFLICT_EMAIL: IErrorDetail = {
  type: ErrorTypes.CONFLICT,
  message: 'Email already exists',
};

export const INVALID_EMAIL_OR_PASSWORD: IErrorDetail = {
  type: ErrorTypes.UNAUTHORIZED,
  message: 'Invalid email or password',
};

export const INVALID_EMAIL_VERIFICATION_CODE: IErrorDetail = {
  type: ErrorTypes.FORBIDDEN,
  message: 'Confirmation code has expired or is invalid',
};
