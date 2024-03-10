import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserClaim, UserRepository } from '@modules/auth';
import * as Common from '../../common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HttpUserLocalAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers[Common.AUTHENTICATED_USER_TOKEN_KEY];
    if (token === undefined)
      throw new UnauthorizedException(Common.AuthNotSignedIn);
    const userJWT = this.jwtService.decode<UserClaim>(token);
    if (!userJWT)
      throw new UnauthorizedException(Common.AuthSignInTokenInvalid);

    const user = await this.userRepository.getUserById(userJWT.userId);
    if (!user) throw new Error('InvalidOperation: User not found');

    request[Common.AUTHENTICATED_USER_KEY] = user;
    return true;
  }
}
