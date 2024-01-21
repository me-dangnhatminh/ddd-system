import {
  GetUserHandler,
  GetUsersHandler,
  LoginUserHanlder,
} from '@modules/user/queries';
import { CreateUserHandler } from '@modules/user/commands';

import { UsersController } from '@infrastructure/controllers';

import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

const HandlersProvider: Provider[] = [
  GetUserHandler,
  GetUsersHandler,
  CreateUserHandler,
  LoginUserHanlder,
];

@Module({
  imports: [JwtModule],
  providers: [...HandlersProvider],
  controllers: [UsersController],
})
export class UserModule {}
