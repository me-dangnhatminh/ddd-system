import { CommonErrorType } from './constants';
import { IInternalError } from './interfaces';

export const InternalError: IInternalError = {
  type: CommonErrorType.Internal,
  title: 'An internal error occurred.',
  detail: 'An internal error occurred. Please try again later.',
};
