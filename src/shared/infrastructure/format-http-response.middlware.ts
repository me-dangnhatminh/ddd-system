import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { isErrorDetail } from '../common';
import { getHttpStatusFromErrorType } from '../common/utils/http.utils';

@Injectable()
export class FormatHttpResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json;
    res.json = function (body) {
      if (isErrorDetail(body)) {
        const status = getHttpStatusFromErrorType(body.type);
        if (status !== undefined) res.status(status);
        res.setHeader('Content-Type', 'application/problem+json'); // RFC 7807, TODO: move to a constant
      }
      return originalJson.call(this, body);
    };
    next();
  }
}
