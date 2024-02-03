import { ErrorTypes } from './constants';
import { IErrorDetail } from './interfaces';

export class Exception extends Error implements IErrorDetail {
  constructor(
    public readonly type: string = ErrorTypes.INTERNAL,
    public readonly message: string = 'Internal server error',
  ) {
    super(message);
  }
}

export class NotFoundException extends Exception {
  constructor(message: string = 'Not found') {
    super(ErrorTypes.NOT_FOUND, message);
  }
}

export class BadRequestException extends Exception {
  constructor(message: string = 'Bad request') {
    super(ErrorTypes.BAD_REQUEST, message);
  }
}

export class UnauthorizedException extends Exception {
  constructor(message: string = 'Unauthorized') {
    super(ErrorTypes.UNAUTHORIZED, message);
  }
}

export class ForbiddenException extends Exception {
  constructor(message: string = 'Forbidden') {
    super(ErrorTypes.FORBIDDEN, message);
  }
}

export class ConflictException extends Exception {
  constructor(message: string = 'Conflict') {
    super(ErrorTypes.CONFLICT, message);
  }
}

export class UnprocessableEntityException extends Exception {
  constructor(message: string = 'Unprocessable entity') {
    super(ErrorTypes.UNPROCESSABLE_ENTITY, message);
  }
}

export class InvalidParameterException extends Exception {
  constructor(message: string = 'Invalid parameter') {
    super(ErrorTypes.INVALID_PARAMETER, message);
  }
}

export class InternalServerErrorException extends Exception {
  constructor(message: string = 'Internal server error') {
    super(ErrorTypes.INTERNAL, message);
  }
}

export class NotImplementedException extends Exception {
  constructor(message: string = 'Not implemented') {
    super(ErrorTypes.NOT_IMPLEMENTED, message);
  }
}

export class ServiceUnavailableException extends Exception {
  constructor(message: string = 'Service unavailable') {
    super(ErrorTypes.SERVICE_UNAVAILABLE, message);
  }
}

export class GatewayTimeoutException extends Exception {
  constructor(message: string = 'Gateway timeout') {
    super(ErrorTypes.GATEWAY_TIMEOUT, message);
  }
}

export class TooManyRequestsException extends Exception {
  constructor(message: string = 'Too many requests') {
    super(ErrorTypes.TOO_MANY_REQUESTS, message);
  }
}
