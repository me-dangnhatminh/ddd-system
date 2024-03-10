import { Injectable, NestMiddleware } from '@nestjs/common';
import { isErrorDetail } from '@shared';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FormatResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json;
    res.json = function (body) {
      if (isErrorDetail(body))
        res.setHeader('Content-Type', 'application/problem+json');
      return originalJson.call(this, body);
    };
    next();
  }
}
