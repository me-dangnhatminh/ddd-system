import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserClaim, UserRepository } from '@modules/auth';
import {
  AUTHENTICATED_USER_KEY,
  AUTHENTICATED_USER_TOKEN_KEY,
  NOT_LOGGED_IN,
} from '../../common/constants';
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
    if (!Boolean(token)) throw new UnauthorizedException(NOT_LOGGED_IN);
    const userJWT = this.jwtService.decode<UserClaim>(token);
    if (!Boolean(userJWT)) throw new UnauthorizedException(NOT_LOGGED_IN);
    if (!Boolean(userJWT.userId))
      throw new Error('InvalidOptions: userId is required in token.');

    const user = await this.userRepository.getUserById(userJWT.userId);
    if (!user) throw new UnauthorizedException(NOT_LOGGED_IN);

    request[AUTHENTICATED_USER_KEY] = user;
    return true;
  }
}
