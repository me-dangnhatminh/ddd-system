import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IUserRepository, IAuthService } from '@modules/auth';
import { JwtService } from '@nestjs/jwt';
import {
  AUTHENTICATED_USER_KEY,
  AUTH_USER_TOKEN_KEY,
  AuthErrors,
} from '../../common';
import { Request } from 'express';

@Injectable()
export class HttpUserLocalAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.cookies[AUTH_USER_TOKEN_KEY];
    if (token === undefined) throw AuthErrors.notSignedIn();

    const claim = await this.authService.validateAuthToken(token);
    if (!claim) throw AuthErrors.invalidSignInToken();

    const user = await this.userRepository.getUserById(claim.email);
    if (!user) throw new Error('InvalidOperation: User not found');

    request[AUTHENTICATED_USER_KEY] = user;
    return true;
  }
}
