import { ErrorTypes, IErrorDetail } from '@common';

export const INVALID_EMAIL: IErrorDetail = {
  type: ErrorTypes.INVALID_PARAMETER,
  message: 'Email must be a valid email address',
};

export const INVALID_PASSWORD: IErrorDetail = {
  type: ErrorTypes.INVALID_PARAMETER,
  message:
    'Password must be greater than 8 characters, at least one uppercase letter',
};

export const INVALID_FIRST_NAME: IErrorDetail = {
  type: ErrorTypes.INVALID_PARAMETER,
  message: 'First name must be greater than 0 and less than 8 characters',
};

export const INVALID_LAST_NAME: IErrorDetail = {
  type: ErrorTypes.INVALID_PARAMETER,
  message: 'Last name must be greater than 0 and less than 8 characters',
};

export const USER_NOT_LOGGED: IErrorDetail = {
  type: ErrorTypes.UNAUTHORIZED,
  message: 'User is not logged',
};

export const USER_NOT_FOUND: IErrorDetail = {
  type: ErrorTypes.NOT_FOUND,
  message: 'User not found',
};

export const USER_ALREADY_EXISTS: IErrorDetail = {
  type: ErrorTypes.CONFLICT,
  message: 'User already exists',
};

export const PASSWORD_NOT_MATCH: IErrorDetail = {
  type: ErrorTypes.UNAUTHORIZED,
  message: 'Password not match',
};
