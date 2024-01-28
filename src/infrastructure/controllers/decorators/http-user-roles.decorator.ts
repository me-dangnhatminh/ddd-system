import { UserRole } from '@modules/auth';
import { SetMetadata } from '@nestjs/common';

import { USER_ROLES_METADATA } from '../constants';

export const HttpUserRoles = (...roles: UserRole[]) =>
  SetMetadata(USER_ROLES_METADATA, roles);
