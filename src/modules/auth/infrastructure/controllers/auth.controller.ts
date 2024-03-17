import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestSwagger from '@nestjs/swagger';
import * as Express from 'express';
import { isLeft } from 'fp-ts/lib/Either';

import { SignInUserBody } from './view-models';
import { UserPassword, IUserRepository } from '../../domain';
import {
  AuthService,
  SignInUserCommand,
  SignUpUserCommand,
} from '../../application';
import { AUTH_USER_TOKEN_KEY, AuthErrors } from '../../common';
import {
  EmailValidityChecksBody,
  PasswordValidityChecksBody,
  SignUpUserBody,
  UsernameValidityChecksBody,
} from './view-models/signup-user.dto';

@NestCommon.Controller('auth')
@NestSwagger.ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: IUserRepository,
    private readonly commandBus: NestCQRS.CommandBus,
  ) {}

  @NestCommon.Post('signup')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async signUp(
    @NestCommon.Body() dto: SignUpUserBody,
    @NestCommon.Res({ passthrough: true }) response: Express.Response,
  ) {
    const signUpCommand = new SignUpUserCommand(dto);
    const signUpResult = await this.commandBus.execute(signUpCommand);
    if (isLeft(signUpResult)) return signUpResult.left;

    const token = await this.authService.getAuthToken(dto.email);
    this.formatAuthResponse(response, token);
  }

  @NestCommon.Post('signin')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async login(
    @NestCommon.Body() dto: SignInUserBody,
    @NestCommon.Res({ passthrough: true }) response: Express.Response,
  ) {
    const command = new SignInUserCommand(dto);
    const result = await this.commandBus.execute(command);
    if (isLeft(result)) return result.left;

    const token = await this.authService.getAuthToken(dto.email);
    this.formatAuthResponse(response, token);
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

  private async formatAuthResponse(res: Express.Response, token: string) {
    res.cookie(AUTH_USER_TOKEN_KEY, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }
}
