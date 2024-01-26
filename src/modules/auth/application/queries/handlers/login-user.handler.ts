import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { LoginUserQuery, LoginUserQueryResult } from '../login-user.query';
import { UserRepository } from '../../../domain/interfaces';
import { JWTClaims } from '../../../domain/jwt';

@QueryHandler(LoginUserQuery)
export class LoginUserHanlder
  implements IQueryHandler<LoginUserQuery, LoginUserQueryResult>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(query: LoginUserQuery): Promise<LoginUserQueryResult> {
    const { email, password } = query;
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw new Error('Invalid credentials');

    const claims: JWTClaims = {
      userId: user.id,
      isEmailVerified: false,
      email: user.email,
      username: user.name,
      role: user.role,
    };
    const accessToken = await this.jwtService.sign(claims);
    return { accessToken };
  }
}
