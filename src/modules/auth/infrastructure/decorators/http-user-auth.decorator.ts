import * as NestCommon from '@nestjs/common';

import * as Domain from '../../domain';
import * as Common from '../../common';

import { HttpUserLocalAuthGuard } from '../guards/http-user-local-auth.guard';
import { HttpUserRoleGuard } from '../guards/http-user-role.guard';

interface Options {
  roles?: Domain.UserRole[];
}

export const HttpUserAuth = (obs: Options = {}): ((...args: any) => void) => {
  const useGuards = [HttpUserLocalAuthGuard, HttpUserRoleGuard];
  let meta: NestCommon.CustomDecorator<string>;

  if (!Boolean(obs.roles))
    meta = NestCommon.SetMetadata(Common.USER_ROLES_METADATA, null);
  else meta = NestCommon.SetMetadata(Common.USER_ROLES_METADATA, obs.roles);

  return NestCommon.applyDecorators(meta, NestCommon.UseGuards(...useGuards));
};
