import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestSwagger from '@nestjs/swagger';
import * as Express from 'express';
import { isLeft } from 'fp-ts/lib/Either';

import { SignInUserBody } from './view-models';
import { UserPassword, UserRepository } from '../../domain';
import { SignInUserCommand, GetAuthUserTokenQuery } from '../../application';
import { AUTH_USER_TOKEN_KEY, AuthErrors } from '../../common';
import {
  EmailValidityChecksBody,
  PasswordValidityChecksBody,
  SignUpUserBody,
  UsernameValidityChecksBody,
} from './view-models/signup-user.dto';
import { SignUpUserCommand } from '../../application/commands/signup-user.command';

@NestCommon.Controller('auth')
@NestSwagger.ApiTags('auth')
export class AuthController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: NestCQRS.CommandBus,
    private readonly queryBus: NestCQRS.QueryBus,
  ) {}

  @NestCommon.Post('signup')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async signUp(@NestCommon.Body() dto: SignUpUserBody) {
    const command = new SignUpUserCommand(dto);
    const result = await this.commandBus.execute(command);
    if (isLeft(result)) return result.left;
  }

  @NestCommon.Post('signin')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async login(
    @NestCommon.Body() dto: SignInUserBody,
    @NestCommon.Res({ passthrough: true }) response: Express.Response,
  ) {
    const command = new SignInUserCommand(dto);
    const commandR = await this.commandBus.execute(command);
    if (isLeft(commandR)) return commandR.left;

    const getTokenQuery = new GetAuthUserTokenQuery(dto.email);
    const queryR = await this.queryBus.execute(getTokenQuery);
    if (isLeft(queryR)) return queryR.left;

    const token = queryR.right;
    response.cookie(AUTH_USER_TOKEN_KEY, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }

  @NestCommon.Post('email-validity-checks')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async checkEmailValidity(@NestCommon.Body() dto: EmailValidityChecksBody) {
    const user = await this.userRepository.getUserByEmail(dto.email);
    if (user) return AuthErrors.emailAlreadyExists(dto.email);
  }

  @NestCommon.Post('password-validity-checks')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async checkPasswordValidity(
    @NestCommon.Body() dto: PasswordValidityChecksBody,
  ) {
    const isValid = UserPassword.validate(dto.password);
    if (!isValid) return AuthErrors.passwordInvalid();
  }

  @NestCommon.Post('username-validity-checks')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async checkUsernameValidity(
    @NestCommon.Body() dto: UsernameValidityChecksBody,
  ) {
    const user = await this.userRepository.getUserByUsername(dto.username);
    if (user) return AuthErrors.usernameAlreadyExists(dto.username);
  }
}
