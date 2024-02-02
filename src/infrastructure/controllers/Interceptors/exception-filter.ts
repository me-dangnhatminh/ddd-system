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
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let errorRes: ApiResponse<undefined, any> = ApiResponse.error();
    errorRes = this.handleNestException(error, errorRes);
    errorRes = this.handleCoreException(error, errorRes);

    const API_LOG_ENABLE = true;
    if (API_LOG_ENABLE) {
      const message: string =
        `\nMethod: ${request.method}, ${request.path}` +
        `\n${errorRes.getErrorDisplay()}`;
      Logger.error(message);
    }
    return response.json(errorRes);
  }

  private handleNestException(error: any, res: ApiResponse<undefined, any>) {
    if (!(error instanceof HttpException)) return res;
    return ApiResponse.error({
      code: error.getStatus(),
      type: ErrorTypes.INTERNAL, // TODO: classification of error
      message: error.message,
    });
  }

  private handleCoreException(error: any, res: ApiResponse<undefined, any>) {
    if (!(error instanceof ApiResponse)) return res;
    if (!error.error) throw new Error('ApiResponse error is not defined');
    return ApiResponse.error({
      code: 'INTERNAL_SERVER_ERROR',
      type: ErrorTypes.INTERNAL,
      message: error.error.message,
    });
  }
}
