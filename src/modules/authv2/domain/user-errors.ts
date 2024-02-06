import { ErrorTypes, IErrorDetail } from '@common';

export const INVALID_EMAIL: IErrorDetail = {
  type: ErrorTypes.INVALID_PARAMETER,
  message: 'Email must be a valid email address',
};

export const INVALID_PASSWORD: IErrorDetail = {
  type: ErrorTypes.INVALID_PARAMETER,
  message:
    'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number',
};

export const INVALID_ROLES: IErrorDetail = {
  type: ErrorTypes.INVALID_PARAMETER,
  message: 'Roles is required and must be an array of at least one role',
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
