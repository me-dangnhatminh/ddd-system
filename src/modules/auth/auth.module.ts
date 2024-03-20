import * as NestCommon from '@nestjs/common';

import * as Infra from './infrastructure';
import * as App from './application';
import { NextFunction, Response } from 'express';
import { AppError } from '@shared';
import { getHttpStatusFromErrorType } from './common/utils/auth-http.util.';
import { IAuthService } from './domain';

const AuthServiceProvider: NestCommon.Provider = {
  provide: IAuthService,
  useClass: App.AuthService,
};

const HandlersProvider: NestCommon.Provider[] = [
  // -- Services
  AuthServiceProvider,
  // -- Events
  // -- Queries
  App.GetAllAsAdminHandler,
  App.GetProfileAsAdminHandler,
  App.GetProfileHandler,
  App.SignInUserHandler,
  // -- Commands
  App.ChangePasswordHandler,
  App.SignUpUserHandler,
  App.VerifyEmailCodeHandler,
  App.RequestEmailVerificationHandler,
];

@NestCommon.Module({
  imports: [],
  controllers: [Infra.UserController, Infra.AuthController],
  providers: [...HandlersProvider],
})
export class AuthModule {
  constructor() {}

  configure(consumer: NestCommon.MiddlewareConsumer) {
    consumer
      .apply((req, res: Response, next: NextFunction) => {
        const originalJson = res.json;
        res.json = function (body) {
          if (body instanceof AppError) {
            const error = body.error;
            const status = getHttpStatusFromErrorType(error.type);
            if (status) {
              res.status(status);
              error['status'] = status; // TODO: not sure
            }
            res.setHeader('Content-Type', 'application/problem+json'); // RFC 7807, TODO: move to a constant
            return originalJson.call(this, error);
          }
          return originalJson.call(this, body);
        };
        next();
      })
      .forRoutes(Infra.AuthController, Infra.UserController);
  }
}
