import { ErrorTypes } from '@common';
import { HttpStatus } from '@nestjs/common';

const ErrorTypeMapToHttpCode = {
  [ErrorTypes.CONFLICT]: HttpStatus.CONFLICT,
  [ErrorTypes.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorTypes.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ErrorTypes.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
  [ErrorTypes.FORBIDDEN]: HttpStatus.FORBIDDEN,
  [ErrorTypes.BAD_REQUEST]: HttpStatus.BAD_REQUEST,
  [ErrorTypes.UNPROCESSABLE_ENTITY]: HttpStatus.UNPROCESSABLE_ENTITY,
  [ErrorTypes.TOO_MANY_REQUESTS]: HttpStatus.TOO_MANY_REQUESTS,
  [ErrorTypes.SERVICE_UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
  [ErrorTypes.GATEWAY_TIMEOUT]: HttpStatus.GATEWAY_TIMEOUT,
  [ErrorTypes.INVALID_PARAMETER]: HttpStatus.BAD_REQUEST,
};

export class HttpStatusUtil {
  static mapErrorTypeToHttpCode(errorType) {
    const httpCode = ErrorTypeMapToHttpCode[errorType];
    return httpCode ?? ErrorTypeMapToHttpCode['INTERNAL'];
  }
}
