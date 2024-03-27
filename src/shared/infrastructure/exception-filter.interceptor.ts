import * as NestCommon from '@nestjs/common';
import { AppError } from '../common';
import { Request, Response } from 'express';
import { AppConfig } from './app.config';
import { ConfigService } from '@nestjs/config';

@NestCommon.Injectable()
export class ExceptionFilter implements NestCommon.ExceptionFilter {
  constructor(private readonly appConfig: ConfigService<AppConfig, true>) {}

  catch(exception: any, host: NestCommon.ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();

    let res: AppError = AppError.unknown();
    res = this.handeAppError(exception, res);
    res = this.handleNestException(exception, res);

    this.logError(exception, request);

    return response.json(res);
  }

  private logError(exception: any, request: Request): void {
    const logEnabled = this.appConfig.get('LOG_ENABLED');
    if (!logEnabled) return;
    const message: string = `Method: ${request.method}, ${request.path}, ${exception}`;
    NestCommon.Logger.error(message, ExceptionFilter.name);
  }

  private handeAppError(exception: unknown, res: AppError): AppError {
    if (!(exception instanceof AppError)) return res;
    return exception;
  }

  private handleNestException(
    exception: unknown,
    response: AppError,
  ): AppError {
    if (!(exception instanceof NestCommon.HttpException)) return response;
    const error = exception.getResponse();
    if (error instanceof AppError) return error;

    return response;
  }
}
