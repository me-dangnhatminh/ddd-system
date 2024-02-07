import { ApiResponse } from '@common';
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

    const API_LOG_ENABLE = false;
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
      message: exception.message,
    });
  }
}
