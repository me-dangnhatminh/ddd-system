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
  controllers: [AuthController],
  providers: [...HandlersProvider],
})
export class AuthModule {}
