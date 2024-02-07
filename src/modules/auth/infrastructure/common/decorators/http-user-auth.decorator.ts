import { UserRole } from '@modules/auth';
import {
  applyDecorators,
  CustomDecorator,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { HttpUserLocalAuthGuard } from '../guards/http-user-local-auth.guard';
import { USER_ROLES_METADATA } from '../constants';
import { HttpUserRoleGuard } from '../guards/http-user-role.guard';

interface Options {
  roles?: UserRole[];
}

export const HttpUserAuth = (obs: Options = {}): ((...args: any) => void) => {
  const useGuards = [HttpUserLocalAuthGuard, HttpUserRoleGuard];
  let meta: CustomDecorator<string>;

  if (!Boolean(obs.roles)) meta = SetMetadata(USER_ROLES_METADATA, null);
  else meta = SetMetadata(USER_ROLES_METADATA, obs.roles);

  return applyDecorators(meta, UseGuards(...useGuards));
};
