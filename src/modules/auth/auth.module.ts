import * as NestCommon from '@nestjs/common';

import * as Infra from './infrastructure';
import * as App from './application';

const HandlersProvider: NestCommon.Provider[] = [
  // -- Queries
  App.GetAllAsAdminHandler,
  App.GetProfileAsAdminHandler,
  App.GetProfileHandler,
  App.GetAuthUserTokenHandler,
  // -- Commands
  App.ChangePasswordHandler,
  App.SignUpUserHandler,
  App.SignInUserHandler,
  App.ConfirmEmailHandler,
  App.RequestEmailConfirmationHandler,
];

@NestCommon.Module({
  imports: [],
  controllers: [Infra.UserController, Infra.AuthController],
  providers: [...HandlersProvider],
})
export class AuthModule {
  constructor() {}
}
