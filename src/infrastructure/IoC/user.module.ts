import { Module, Provider } from '@nestjs/common';
import { UserCreatedHandler, UsersController } from '../controllers';
import {
  GetUserHandler,
  GetUsersHandler,
  CreateUserHandler,
  LoginUserHanlder,
} from '@modules/auth';

const HandlersProvider: Provider[] = [
  UserCreatedHandler,
  GetUserHandler,
  GetUsersHandler,
  CreateUserHandler,
  LoginUserHanlder,
];

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [...HandlersProvider],
})
export class UserModule {}
