import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { isErrorDetail } from '../common';

@Injectable()
export class FormatHttpResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json;
    res.json = function (body) {
      if (isErrorDetail(body))
        res.setHeader('Content-Type', 'application/problem+json'); // RFC 7807, TODO: move to a constant
      return originalJson.call(this, body);
    };
    next();
  }
}
