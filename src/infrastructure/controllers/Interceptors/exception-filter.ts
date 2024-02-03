import { ApiResponse, AppException, ErrorTypes } from '@common';
import {
  ArgumentsHost,
  Injectable,
  Logger,
  ExceptionFilter as NestExceptionFilter,
  HttpException,
} from '@nestjs/common';

const ErrorTypesMapToHttpStatus = {
  [ErrorTypes.INTERNAL]: 500,
  [ErrorTypes.INVALID_PARAMETER]: 400,
  [ErrorTypes.UNAUTHORIZED]: 401,
  [ErrorTypes.FORBIDDEN]: 403,
  [ErrorTypes.NOT_FOUND]: 404,
  [ErrorTypes.CONFLICT]: 409,
  [ErrorTypes.UNPROCESSABLE_ENTITY]: 422,
};

@Injectable()
export class ExceptionFilter implements NestExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let errorRes: ApiResponse<undefined, any> = ApiResponse.error();
    errorRes = this.handleNestException(exception, errorRes);
    errorRes = this.handleCoreException(exception, errorRes);

    const API_LOG_ENABLE = true;
    if (API_LOG_ENABLE) {
      const message: string =
        `\nMethod: ${request.method}, ${request.path}` +
        `\n${errorRes.getErrorDisplay()}`;
      Logger.error(message);
    }
    return response.json(errorRes);
  }

  private handleNestException(
    exception: any,
    apiRes: ApiResponse<undefined, any>,
  ) {
    if (!(exception instanceof HttpException)) return apiRes;

    return ApiResponse.error({
      code: exception.getStatus(),
      type: ErrorTypes.INTERNAL,
      message: exception.message,
    });
  }

  private handleCoreException(
    exception: any,
    apiRes: ApiResponse<undefined, any>,
  ) {
    if (!(exception instanceof AppException)) return apiRes;
    const code = ErrorTypesMapToHttpStatus[exception.type] ?? 500;
    const message = exception.message;
    return ApiResponse.error({ code, message });
  }
}
