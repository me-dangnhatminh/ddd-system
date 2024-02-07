import { Module, Provider } from '@nestjs/common';
import { AuthController } from './infrastructure';
import {
  ChangePasswordHandler,
  GetListUsersHandler,
  LoginUserHandler,
  RegisterUserHandler,
} from './application';

const HandlersProvider: Provider[] = [
  GetListUsersHandler,
  LoginUserHandler,
  ChangePasswordHandler,
  RegisterUserHandler,
];

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [...HandlersProvider],
})
export class AuthModule {}
