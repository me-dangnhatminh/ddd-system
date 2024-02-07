import { Module, Provider } from '@nestjs/common';
import { AuthController } from './infrastructure';
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
];

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [ExceptionFilterProvider, ...HandlersProvider],
})
export class AuthModule {}
