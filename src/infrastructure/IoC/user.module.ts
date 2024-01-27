import { Module, Provider } from '@nestjs/common';
import { AuthController } from '../controllers';
import {
  GetUserHandler,
  GetUsersHandler,
  CreateUserHandler,
  LoginUserHanlder,
} from '@modules/auth';

const HandlersProvider: Provider[] = [
  GetUserHandler,
  GetUsersHandler,
  CreateUserHandler,
  LoginUserHanlder,
];

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [...HandlersProvider],
})
export class UserModule {}
