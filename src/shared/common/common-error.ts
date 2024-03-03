import { CommonErrorType } from './constants';
import { IInternalError } from './interfaces';

export const INTERNAL_ERROR: IInternalError = {
  type: CommonErrorType.INTERNAL,
  title: 'An internal error occurred.',
  detail: 'An internal error occurred. Please try again later.',
};
