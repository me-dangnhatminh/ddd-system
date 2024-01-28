import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserJWTClaims, UserRepository } from '@modules/auth';
import {
  AUTHENTICATED_USER_KEY,
  AUTHENTICATED_USER_TOKEN_KEY,
} from '../constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HttpUserLocalAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers[AUTHENTICATED_USER_TOKEN_KEY];
    if (!Boolean(token)) throw new UnauthorizedException('Unauthorized');
    const userJWT: UserJWTClaims = this.jwtService.decode(token);
    if (!Boolean(userJWT)) throw new UnauthorizedException('Unauthorized');
    if (!Boolean(userJWT.userId))
      throw new Error('Logic Error: userJWT is not UserJWTClaims');

    const user = await this.userRepository.getUserById(userJWT.userId);
    if (!user) throw new UnauthorizedException('Unauthorized');

    request[AUTHENTICATED_USER_KEY] = user;
    return true;
  }
}
