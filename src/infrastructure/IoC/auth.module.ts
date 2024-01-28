import { Module, Provider } from '@nestjs/common';
import { AuthController } from '../controllers';
import {
  GetUserHandler,
  GetUsersHandler,
  CreateUserHandler,
  LoginUserHanlder,
  RegisterUserHandler,
  VerifyEmailHandler,
} from '@modules/auth';
import { UserController } from '../controllers/user.controller';

const HandlersProvider: Provider[] = [
  GetUserHandler,
  GetUsersHandler,
  CreateUserHandler,
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
