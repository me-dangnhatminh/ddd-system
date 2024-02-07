import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTHENTICATED_USER_KEY, USER_ROLES_METADATA } from '../constants';
import { User, UserRole } from '@modules/auth';

@Injectable()
export class HttpUserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[] | null>(
      USER_ROLES_METADATA,
      context.getHandler(),
    );

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request[AUTHENTICATED_USER_KEY] as User;
    if (!user || !(user instanceof User))
      throw new Error(
        'User does not exist in the request, please check the HttpUser decorator',
      );

    if (!roles.includes(request.user.role))
      throw new ForbiddenException(
        "You don't have permission to access this resource",
      );
    return true;
  }
}
