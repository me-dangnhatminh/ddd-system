import { IErrorResponse, Result, failure } from '@common';
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
    let errorRes: Result<unknown, IErrorResponse> = failure({
      code: 500,
      message: 'Internal Server Error',
    });
    errorRes = this.handleNestException(exception, errorRes);

    return response.json(errorRes);
  }

  private handleNestException(
    exception: any,
    errorRes: Result<unknown, IErrorResponse>,
  ) {
    if (!(exception instanceof HttpException)) return errorRes;
    return failure({
      code: exception.getStatus(),
      message: exception.message,
    });
  }
}
