import { GetUserHandler, GetUsersHandler } from '@modules/user/queries';

import { UsersController } from '@infrastructure/controllers';
import { Module, Provider } from '@nestjs/common';

const HandlersProvider: Provider[] = [GetUserHandler, GetUsersHandler];

@Module({
  imports: [],
  providers: [...HandlersProvider],
  controllers: [UsersController],
})
export class UserModule {}
