import {
  GetUserHandler,
  GetUsersHandler,
  LoginUserHanlder,
} from '@modules/user/queries';
import { CreateUserHandler } from '@modules/user/commands';

import { UsersController } from '@infrastructure/controllers';

import { Module, Provider } from '@nestjs/common';

const HandlersProvider: Provider[] = [
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
