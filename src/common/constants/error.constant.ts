import { IErrorDetail } from '../interfaces';
import { ErrorTypes } from './error-types.constant';

export const FORBIDDEN: IErrorDetail = {
  code: ErrorTypes.FORBIDDEN,
  message: 'You are not allowed to perform this operation',
};

export const UNAUTHORIZED: IErrorDetail = {
  code: ErrorTypes.UNAUTHORIZED,
  message: 'You are not authorized to perform this operation',
};

export const NOT_FOUND: IErrorDetail = {
  code: ErrorTypes.NOT_FOUND,
  message: 'Resource not found',
};

export const CONFLICT: IErrorDetail = {
  code: ErrorTypes.CONFLICT,
  message: 'Resource already exists',
};

export const BAD_REQUEST: IErrorDetail = {
  code: ErrorTypes.BAD_REQUEST,
  message: 'Bad request',
};
