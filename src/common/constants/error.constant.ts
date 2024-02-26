import { IErrorDetail } from '../interfaces';
import { ErrorTypes } from './error-types.constant';

export const FORBIDDEN: IErrorDetail = {
  reason: ErrorTypes.FORBIDDEN,
  message: 'You are not allowed to perform this operation',
};

export const UNAUTHORIZED: IErrorDetail = {
  reason: ErrorTypes.UNAUTHORIZED,
  message: 'You are not authorized to perform this operation',
};

export const NOT_FOUND: IErrorDetail = {
  reason: ErrorTypes.NOT_FOUND,
  message: 'Resource not found',
};

export const CONFLICT: IErrorDetail = {
  reason: ErrorTypes.CONFLICT,
  message: 'Resource already exists',
};

export const BAD_REQUEST: IErrorDetail = {
  reason: ErrorTypes.BAD_REQUEST,
  message: 'Bad request',
};
