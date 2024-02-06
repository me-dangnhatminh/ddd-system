import { IErrorDetail } from '@common';

export const INVALID_EMAIL: IErrorDetail = {
  type: 'INVALID_PARAMETER',
  message: 'Email must be a valid email address',
};

export const INVALID_PASSWORD: IErrorDetail = {
  type: 'INVALID_PARAMETER',
  message:
    'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number',
};
