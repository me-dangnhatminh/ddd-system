import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { LoginUserQuery, LoginUserQueryResult } from '../login-user.query';
import { UserRepository } from '../../../domain/interfaces';
import { JWTClaims } from '../../../domain/jwt';
import { IErrorResponse } from 'src/common/interfaces/error-response.interface';

export class NotFoundException extends Error implements IErrorResponse {
  constructor(
    public readonly message: string = 'Not found',
    public readonly code: number = 404,
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
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new NotFoundException("Email or password doesn't match");
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw new Error("Email or password doesn't match");

    const claims: JWTClaims = {
      userId: user.id,
      isVerified: false,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.sign(claims);
    return { accessToken };
  }
}
