import { GetUserHandler, GetUsersHandler } from '@modules/user/queries';
import { CreateUserHandler } from '@modules/user/commands';

import { UsersController } from '@infrastructure/controllers';
import { Module, Provider } from '@nestjs/common';

const HandlersProvider: Provider[] = [
  GetUserHandler,
  GetUsersHandler,
  CreateUserHandler,
];

@Module({
  imports: [],
  providers: [...HandlersProvider],
  controllers: [UsersController],
})
export class UserModule {}
