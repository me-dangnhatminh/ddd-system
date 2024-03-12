import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserClaim, UserRepository } from '@modules/auth';
import { JwtService } from '@nestjs/jwt';
import {
  AUTHENTICATED_USER_KEY,
  AUTHENTICATED_USER_TOKEN_KEY,
  AuthErrors,
} from '../../common';

@Injectable()
export class HttpUserLocalAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers[AUTHENTICATED_USER_TOKEN_KEY];
    if (token === undefined) throw AuthErrors.notSignedIn();
    const userJWT = this.jwtService.decode<UserClaim>(token);
    if (!userJWT) throw AuthErrors.notSignedIn();

    const user = await this.userRepository.getUserById(userJWT.userId);
    if (!user) throw new Error('InvalidOperation: User not found');

    request[AUTHENTICATED_USER_KEY] = user;
    return true;
  }
}
