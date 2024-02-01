import { ApiResponse, ErrorType } from '@common';
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

    errorRes = this.handleNestException(error);
    errorRes = this.handleCoreException(error);

    const API_LOG_ENABLE = true;
    if (API_LOG_ENABLE) {
      const message: string =
        `Method: ${request.method}; ` +
        `Path: ${request.path}; ` +
        `Error: ${errorRes.getErrorDisplay()}`;
      Logger.error(message);
    }
    return response.json(errorRes);
  }

  private handleCoreException(error: any) {
    if (error instanceof ApiResponse) return error;
    return ApiResponse.error({
      code: 'INTERNAL_SERVER_ERROR',
      type: ErrorType.InternalServerError,
      message: error.message,
    });
  }

  private handleNestException(error: any) {
    if (!(error instanceof HttpException)) return error;
    return ApiResponse.error({
      code: 'INTERNAL_SERVER_ERROR',
      type: ErrorType.InternalServerError,
      message: error.message,
    });
  }
}
