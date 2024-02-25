import * as NestCQRS from '@nestjs/cqrs';
import * as NestJWT from '@nestjs/jwt';
import * as Either from 'fp-ts/Either';

import * as Shared from '@common';
import * as Common from '../../../common';
import * as Domain from '../../../domain';

import { LoginUserQuery, LoginUserQueryResult } from '../login-user.query';

@NestCQRS.QueryHandler(LoginUserQuery)
export class LoginUserHandler
  implements
    NestCQRS.IQueryHandler<
      LoginUserQuery,
      Either.Either<Shared.IErrorDetail, LoginUserQueryResult>
    >
{
  constructor(
    private readonly jwtService: NestJWT.JwtService,
    private readonly userRepository: Domain.UserRepository,
  ) {}

  async execute(
    query: LoginUserQuery,
  ): Promise<Either.Either<Shared.IErrorDetail, LoginUserQueryResult>> {
    const user = await this.userRepository.getUserByEmail(query.email);

    if (!user) return Either.left(Common.INVALID_EMAIL_OR_PASSWORD);
    const isPasswordValid = user.comparePassword(query.password);
    if (!isPasswordValid) return Either.left(Common.INVALID_EMAIL_OR_PASSWORD);

    const tokenClaims: Domain.UserClaim = {
      userId: user.id,
      email: user.email.value,
      role: user.role,
      isVerified: user.isVerified,
    };
    const token = this.jwtService.sign(tokenClaims, { expiresIn: '1h' }); //TODO: config expiresIn in env
    return Either.right(new LoginUserQueryResult(token));
  }
}
