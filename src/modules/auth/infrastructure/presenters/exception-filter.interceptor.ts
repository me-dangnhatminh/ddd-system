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

    if (true) {
      const message: string = `Method: ${request.method}, ${request.path}, ${exception.message}`;
      Logger.error(message);
    }

    // format error response
    let errorRes: ApiResponse<undefined, any> = ApiResponse.error({
      code: 500,
      message: 'Internal server error',
    });
    errorRes = this.handleNestException(exception, errorRes);
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
