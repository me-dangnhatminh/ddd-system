import { ErrorTypes, IErrorDetail } from '@common';

export const CONFLICT_EMAIL: IErrorDetail = {
  code: ErrorTypes.CONFLICT,
  message: 'Email already exists',
};

export const INVALID_PASSWORD: IErrorDetail = {
  code: ErrorTypes.BAD_REQUEST,
  message: 'Invalid password',
};

export const INVALID_EMAIL_OR_PASSWORD: IErrorDetail = {
  code: ErrorTypes.UNAUTHORIZED,
  message: 'Invalid email or password',
};

export const INVALID_EMAIL_VERIFICATION_CODE: IErrorDetail = {
  code: ErrorTypes.FORBIDDEN,
  message: 'Confirmation code has expired or is invalid',
};
