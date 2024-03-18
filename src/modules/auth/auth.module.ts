import * as NestCommon from '@nestjs/common';

import * as Infra from './infrastructure';
import * as App from './application';

const HandlersProvider: NestCommon.Provider[] = [
  // -- Services
  App.AuthService,
  // -- Events
  // -- Queries
  App.GetAllAsAdminHandler,
  App.GetProfileAsAdminHandler,
  App.GetProfileHandler,
  App.SignInUserHandler,
  // -- Commands
  App.ChangePasswordHandler,
  App.SignUpUserHandler,
  App.VerifyEmailCodeHandler,
  App.RequestEmailVerificationHandler,
];

@NestCommon.Module({
  imports: [],
  controllers: [Infra.UserController, Infra.AuthController],
  providers: [...HandlersProvider],
})
export class AuthModule {
  constructor() {}
}
