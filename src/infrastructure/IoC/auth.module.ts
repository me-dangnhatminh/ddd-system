import { Module, Provider } from '@nestjs/common';
import { AuthController } from '../controllers';
import {
  CreateUserHandler,
  CreateUsersHandler,
  GetUserHandler,
  GetUsersHandler,
  LoginUserHanlder,
  RegisterUserHandler,
  VerifyEmailHandler,
} from '@modules/auth';
import { UserController } from '../controllers/user.controller';

const HandlersProvider: Provider[] = [
  GetUserHandler,
  GetUsersHandler,
  CreateUserHandler,
  CreateUsersHandler,
  LoginUserHanlder,
  RegisterUserHandler,
  VerifyEmailHandler,
];

@Module({
  imports: [],
  controllers: [AuthController, UserController],
  providers: [...HandlersProvider],
})
export class AuthModule {}
