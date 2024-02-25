import { IErrorDetail } from '../interfaces';
import { ErrorTypes } from './error-types.constant';

export const FORBIDDEN: IErrorDetail = {
  type: ErrorTypes.FORBIDDEN,
  message: 'You are not allowed to perform this operation',
};

export const UNAUTHORIZED: IErrorDetail = {
  type: ErrorTypes.UNAUTHORIZED,
  message: 'You are not authorized to perform this operation',
};

export const NOT_FOUND: IErrorDetail = {
  type: ErrorTypes.NOT_FOUND,
  message: 'Resource not found',
};

export const CONFLICT: IErrorDetail = {
  type: ErrorTypes.CONFLICT,
  message: 'Resource already exists',
};

export const BAD_REQUEST: IErrorDetail = {
  type: ErrorTypes.BAD_REQUEST,
  message: 'Bad request',
};
