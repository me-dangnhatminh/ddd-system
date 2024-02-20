import * as NestCommon from '@nestjs/common';
import * as Common from '../../common';
import * as Domain from '../../domain';

export const HttpUserRoles = (...roles: Domain.UserRole[]) =>
  NestCommon.SetMetadata(Common.USER_ROLES_METADATA, roles);
