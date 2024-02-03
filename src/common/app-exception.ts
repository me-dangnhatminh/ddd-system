import { ErrorTypes } from './constants';
import { IErrorDetail } from './interfaces';

export class AppException extends Error implements IErrorDetail {
  constructor(
    public readonly type: string = ErrorTypes.INTERNAL,
    public readonly message: string = 'Internal server error',
  ) {
    super(message);
  }
}
