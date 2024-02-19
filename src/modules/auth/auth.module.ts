import * as NestCommon from '@nestjs/common';
import * as NestCore from '@nestjs/core';
import * as Infra from './infrastructure';
import * as App from './application';

const ExceptionFilterProvider: NestCommon.Provider = {
  provide: NestCore.APP_FILTER,
  useClass: Infra.ExceptionFilter,
};

const HandlersProvider: NestCommon.Provider[] = [
  App.GetListUsersHandler,
  App.LoginUserHandler,
  App.ChangePasswordHandler,
  App.RegisterUserHandler,
  Infra.DemoCreatedHandler,
];

@NestCommon.Module({
  imports: [],
  controllers: [Infra.UserController, Infra.AuthController],
  providers: [ExceptionFilterProvider, ...HandlersProvider],
})
export class AuthModule {}
