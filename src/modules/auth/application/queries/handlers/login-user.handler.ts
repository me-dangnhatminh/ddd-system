import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { LoginUserQuery, LoginUserQueryResult } from '../login-user.query';
import { UserRepository } from '../../../domain/interfaces';
import { UserJWTClaims } from '../../../domain/user-jwt';
import { UnauthorizedException } from '@common';

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
    if (!user)
      throw new UnauthorizedException('Email or password does not match');
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch)
      throw new UnauthorizedException('Email or password does not match');

    const claims: UserJWTClaims = {
      userId: user.id,
      isVerified: false,
      email: user.email,
      role: user.role,
    };

    // TODO: add time to live for token

    const accessToken = await this.jwtService.sign(claims);
    return { accessToken };
  }
}
