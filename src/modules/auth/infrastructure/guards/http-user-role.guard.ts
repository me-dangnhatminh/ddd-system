import * as NestCommon from '@nestjs/common';
import * as NestCore from '@nestjs/core';

import * as Domain from '../../domain';
import * as Common from '../../common';

@NestCommon.Injectable()
export class HttpUserRoleGuard implements NestCommon.CanActivate {
  constructor(private readonly reflector: NestCore.Reflector) {}

  canActivate(context: NestCommon.ExecutionContext): boolean {
    const roles = this.reflector.get<Domain.UserRole[] | null>(
      Common.USER_ROLES_METADATA,
      context.getHandler(),
    );

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request[Common.AUTHENTICATED_USER_KEY] as Domain.User;
    if (!user || !(user instanceof Domain.User))
      throw new Error(
        'User does not exist in the request, please check the HttpUser decorator',
      );

    if (!roles.includes(request.user.role))
      throw new NestCommon.ForbiddenException(
        "You don't have permission to access this resource",
      );
    return true;
  }
}
