import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { Either, left, right } from 'fp-ts/Either';

import { LoginUserQuery, LoginUserQueryResult } from '../login-user.query';
import { UserRepository, UserJWTClaims } from '../../../domain';
import { ErrorTypes, IErrorDetail } from '@common';

const INVALID_EMAIL_OR_PASSWORD: IErrorDetail = {
  type: ErrorTypes.UNAUTHORIZED,
  message: 'Invalid email or password',
};

@QueryHandler(LoginUserQuery)
export class LoginUserHandler
  implements
    IQueryHandler<LoginUserQuery, Either<IErrorDetail, LoginUserQueryResult>>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    query: LoginUserQuery,
  ): Promise<Either<IErrorDetail, LoginUserQueryResult>> {
    const user = await this.userRepository.getByEmail(query.email);

    if (!user) return left(INVALID_EMAIL_OR_PASSWORD);
    const isPasswordValid = user.comparePassword(query.password);
    if (!isPasswordValid) return left(INVALID_EMAIL_OR_PASSWORD);

    const tokenClaims: UserJWTClaims = {
      userId: user.id,
      email: user.email,
      roles: user.roles,
      isVerified: user.isVerified,
    };
    const token = this.jwtService.sign(tokenClaims, { expiresIn: '1h' });
    return right(new LoginUserQueryResult(token));
  }
}
