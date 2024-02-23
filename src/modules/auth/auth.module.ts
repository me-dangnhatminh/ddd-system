import * as NestCommon from '@nestjs/common';
import * as NestCore from '@nestjs/core';
import * as Infra from './infrastructure';
import * as App from './application';

const ExceptionFilterProvider: NestCommon.Provider = {
  provide: NestCore.APP_FILTER,
  useClass: Infra.ExceptionFilter,
};

const HandlersProvider: NestCommon.Provider[] = [
  // -- Queries
  App.GetProfileAsAdminHandler,
  App.GetProfileHandler,
  App.LoginUserHandler,
  // -- Commands
  App.ChangePasswordHandler,
  App.RegisterUserHandler,
  App.ConfirmEmailHandler,
];

@NestCommon.Module({
  imports: [],
  controllers: [Infra.UserController, Infra.AuthController],
  providers: [ExceptionFilterProvider, ...HandlersProvider],
})
export class AuthModule {
  constructor() {}
  configure(consumer: NestCommon.MiddlewareConsumer) {
    consumer.apply(Infra.FormatApiResponseMiddleware).forRoutes('*');
  }
}
