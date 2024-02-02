import { ErrorTypes } from '@common';

export const UserErrors = {
  USER_ALREADY_VERIFIED: {
    reason: ErrorTypes.CONFLICT,
    message: 'User already verified',
  },
  USER_ALREADY_EXISTS: {
    reason: ErrorTypes.CONFLICT,
    message: 'User already exists',
  },
  USER_NOT_VERIFIED: {
    reason: ErrorTypes.UNAUTHORIZED,
    message: 'User not verified',
  },
  USER_NOT_FOUND: {
    reason: ErrorTypes.NOT_FOUND,
    message: 'User not found',
  },
  INVALID_PASSWORD: {
    reason: ErrorTypes.INVALID_PARAMETER,
    message: 'Invalid password',
  },
  INVALID_EMAIL: {
    reason: ErrorTypes.INVALID_PARAMETER,
    message: 'Invalid email',
  },
  INVALID_USERNAME: {
    reason: ErrorTypes.INVALID_PARAMETER,
    message: 'Invalid username',
  },
  INVALID_NAME: {
    reason: ErrorTypes.INVALID_PARAMETER,
    message: 'Invalid name',
  },
  INVALID_TOKEN: {
    reason: ErrorTypes.INVALID_PARAMETER,
    message: 'Invalid token',
  },
};
