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
      Logger.error(message, ExceptionFilter.name);
    }

    // format error response
    let errorRes = ApiResponse.fail({ code: 500, message: 'Internal error!' });
    errorRes = this.handleNestException(exception, errorRes);
    errorRes = this.handlerApiFailed(exception, errorRes);

    return response.json(errorRes);
  }

  private handleNestException(
    exception: any,
    errorRes: ApiResponse<never, any>,
  ) {
    if (!(exception instanceof HttpException)) return errorRes;

    return ApiResponse.fail({
      code: exception.getStatus(),
      message: exception.message,
    });
  }

  private handlerApiFailed(exception: any, errorRes: ApiResponse<never, any>) {
    if (!ApiResponse.isApiResponse(exception)) return errorRes;
    if (ApiResponse.isSucceeded(exception)) return errorRes;

    return ApiResponse.fail(exception.error);
  }
}
