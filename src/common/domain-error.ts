import { ErrorTypes } from './constants';
import { IError } from './interfaces';

export class DomainError extends Error implements IError {
  readonly type: string;
  readonly code: string;

  constructor(code: string, message?: string, type?: string) {
    super(message);
    this.code = code;
    this.type = type ?? ErrorTypes.UNKNOWN;
  }
}
