import * as NestCommon from '@nestjs/common';
import * as NestCore from '@nestjs/core';
import {
  AuthController,
  DemoCreatedHandler,
  UserController,
} from './infrastructure';
import {
  ChangePasswordHandler,
  GetListUsersHandler,
  LoginUserHandler,
  RegisterUserHandler,
} from './application';
import { ExceptionFilter } from './infrastructure/common/Interceptors';

const ExceptionFilterProvider: NestCommon.Provider = {
  provide: NestCore.APP_FILTER,
  useClass: ExceptionFilter,
};

const HandlersProvider: NestCommon.Provider[] = [
  GetListUsersHandler,
  LoginUserHandler,
  ChangePasswordHandler,
  RegisterUserHandler,
  DemoCreatedHandler,
];

@NestCommon.Module({
  imports: [],
  controllers: [UserController, AuthController],
  providers: [ExceptionFilterProvider, ...HandlersProvider],
})
export class AuthModule {}
