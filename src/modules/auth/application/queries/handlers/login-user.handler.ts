import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { ErrorTypes, IErrorResponse } from '@common';

import { LoginUserQuery, LoginUserQueryResult } from '../login-user.query';
import { UserRepository } from '../../../domain/interfaces';
import { UserJWTClaims } from '../../../domain/user-jwt';

export class NotFoundException extends Error implements IErrorResponse {
  constructor(
    public readonly message: string = 'Not found',
    public readonly code: number = 404,
    public readonly type: string = ErrorTypes.NOT_FOUND,
  ) {
    super(message);
  }
}

@QueryHandler(LoginUserQuery)
export class LoginUserHanlder
  implements IQueryHandler<LoginUserQuery, LoginUserQueryResult>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param {LoginUserQuery} query - The query object
   * @returns {LoginUserQueryResult}
   * @throws {NotFoundException} if user not found
   * @throws {Error} if password does not match
   * @description This handler is responsible for executing the LoginUserQuery.
   */
  async execute(query: LoginUserQuery): Promise<LoginUserQueryResult> {
    const { email, password } = query;
    const user = await this.userRepository.getOneByEmail(email);
    if (!user) throw new NotFoundException("Email or password doesn't match");
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw new Error("Email or password doesn't match");

    const claims: UserJWTClaims = {
      userId: user.id,
      isVerified: false,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.sign(claims);
    return { accessToken };
  }
}
