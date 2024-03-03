import * as NestCommon from '@nestjs/common';

@NestCommon.Injectable()
export class ExceptionFilter implements NestCommon.ExceptionFilter {
  catch(exception: any, host: NestCommon.ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    //TODO: config to enable/disable logging in env
    if (true) {
      const message: string = `Method: ${request.method}, ${request.path}, ${exception.message}`;
      NestCommon.Logger.error(message, ExceptionFilter.name);
    }

    return response.json(exception.response);
  }
}
