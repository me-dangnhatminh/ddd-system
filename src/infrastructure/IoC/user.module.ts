import { CreateUserHandler } from '@modules/user/application/commands';
import {
  GetUserHandler,
  GetUsersHandler,
  LoginUserHanlder,
} from '@modules/user/application/queries';
import { Module, Provider } from '@nestjs/common';
import { UserCreatedHandler, UsersController } from '../controllers';

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
