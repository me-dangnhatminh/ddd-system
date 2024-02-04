import { ErrorTypes } from '@common';

export const UserErrors = {
  USER_ALREADY_VERIFIED: {
    type: ErrorTypes.CONFLICT,
    message: 'User already verified',
  },
  USER_ALREADY_EXISTS: {
    type: ErrorTypes.CONFLICT,
    message: 'User already exists',
  },
  USER_NOT_VERIFIED: {
    type: ErrorTypes.UNAUTHORIZED,
    message: 'User not verified',
  },
  USER_NOT_FOUND: {
    type: ErrorTypes.NOT_FOUND,
    message: 'User not found',
  },
  INVALID_PASSWORD: {
    type: ErrorTypes.INVALID_PARAMETER,
    message: 'Invalid password',
  },
  INVALID_EMAIL: {
    type: ErrorTypes.INVALID_PARAMETER,
    message: 'Invalid email',
  },
  INVALID_USERNAME: {
    type: ErrorTypes.INVALID_PARAMETER,
    message: 'Invalid username',
  },
  INVALID_NAME: {
    type: ErrorTypes.INVALID_PARAMETER,
    message: 'Invalid name',
  },
  INVALID_TOKEN: {
    type: ErrorTypes.INVALID_PARAMETER,
    message: 'Invalid token',
  },
};
