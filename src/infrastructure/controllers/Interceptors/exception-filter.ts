import { ApiResponse, ErrorTypes } from '@common';
import {
  ArgumentsHost,
  Injectable,
  Logger,
  ExceptionFilter as NestExceptionFilter,
  HttpException,
} from '@nestjs/common';

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
      type: ErrorTypes.INTERNAL, // TODO: classification of error
      message: exception.message,
    });
  }

  private handleCoreException(
    exception: any,
    apiRes: ApiResponse<undefined, any>,
  ) {
    if (!(exception instanceof ApiResponse)) return apiRes;
    if (!exception.error) throw new Error('ApiResponse error is not defined');
    return ApiResponse.error({
      code: exception.error.code,
      type: ErrorTypes.INTERNAL,
      message: exception.error.message,
    });
  }
}
