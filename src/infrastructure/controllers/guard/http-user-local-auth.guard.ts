import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from '@modules/auth';

const USER_ROLES_PROP = 'userRoles';

export class HttpUserLocalAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRoles = this.reflector.get<UserRole[]>(
      USER_ROLES_PROP,
      context.getHandler(),
    );
    const isPassRolesAuth: boolean =
      userRoles.length > 0
        ? userRoles.includes(request.participant.role)
        : true;
    if (!isPassRolesAuth) throw new UnauthorizedException('Unauthorized');
    return true;
  }
}
