import { Injectable, NestMiddleware } from '@nestjs/common';
import { isErrorDetail } from '@shared';
import { Request, Response, NextFunction } from 'express';
import { getHttpStatusFromErrorType } from '../../common/utils/auth-http.util.';

@Injectable()
export class FormatResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json;
    res.json = function (body) {
      if (isErrorDetail(body)) {
        res.setHeader('Content-Type', 'application/problem+json'); //TODO: move to a constant
        const status = getHttpStatusFromErrorType(body.type);
        if (status !== undefined) res.status(status);
      }
      return originalJson.call(this, body);
    };
    next();
  }
}
