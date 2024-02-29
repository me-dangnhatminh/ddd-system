import { Exception } from './exception';
import { ErrorTypes } from './constants';

export class InternalError extends Exception {
  constructor(code: string, message: string) {
    super(code, message, ErrorTypes.INTERNAL);
  }
}

export class ValidationError extends Exception {
  constructor(code: string, message: string) {
    super(code, message, ErrorTypes.VALIDATION);
  }
}

export class AuthorizationError extends Exception {
  constructor(code: string, message: string) {
    super(code, message, ErrorTypes.AUTHORIZATION);
  }
}

export class AuthenticationError extends Exception {
  constructor(code: string, message: string) {
    super(code, message, ErrorTypes.AUTHENTICATION);
  }
}

export class ConcurrencyError extends Exception {
  constructor(code: string, message: string) {
    super(code, message, ErrorTypes.CONCURRENCY);
  }
}

export class InvalidArgumentError extends Exception {
  constructor(code: string, message: string) {
    super(code, message, ErrorTypes.INVALID_ARGUMENT);
  }
}

export class ConflictError extends Exception {
  constructor(code: string, message: string) {
    super(code, message, ErrorTypes.CONFLICT);
  }
}

export class NotFoundError extends Exception {
  constructor(code: string, message: string) {
    super(code, message, ErrorTypes.NOT_FOUND);
  }
}
