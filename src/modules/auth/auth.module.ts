import { Module, Provider } from '@nestjs/common';
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
import { APP_FILTER } from '@nestjs/core';

const ExceptionFilterProvider: Provider = {
  provide: APP_FILTER,
  useClass: ExceptionFilter,
};

const HandlersProvider: Provider[] = [
  GetListUsersHandler,
  LoginUserHandler,
  ChangePasswordHandler,
  RegisterUserHandler,
  DemoCreatedHandler,
];

@Module({
  imports: [],
  controllers: [UserController, AuthController],
  providers: [ExceptionFilterProvider, ...HandlersProvider],
})
export class AuthModule {}
