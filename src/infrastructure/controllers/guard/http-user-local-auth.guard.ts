import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '@modules/auth';

export const USER_AUTH_TOKEN_KEY = 'x-user-token';
export const AUTHENTICATED_USER_PROP = 'user';

@Injectable()
export class HttpUserLocalAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = request.headers[USER_AUTH_TOKEN_KEY];

    // fake user
    const user = User.create({
      id: '04954e0b-714a-41aa-a784-149e572c900e',
      firstName: 'John',
      lastName: 'Doe',
      email: 'fake@gmail.com',
      password: 'fake123456',
    });
    if (!Boolean(user)) throw new UnauthorizedException('Unauthorized');
    request[AUTHENTICATED_USER_PROP] = user;
    return true;
  }
}
