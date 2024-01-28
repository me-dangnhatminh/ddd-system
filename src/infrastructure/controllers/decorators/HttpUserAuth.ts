import { UserRole } from '@modules/auth';
import {
  applyDecorators,
  CustomDecorator,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { HttpUserLocalAuthGuard } from '../guard/http-user-local-auth.guard';

/**
 * @param permission {HttpUserAuthPermission} - Permission to access this route
 * @param permission.required {boolean} - Required permission to access this route (default: true)
 * @param permission.roles {UserRole[]} - Required roles to access this route (default: [])
 * @returns {(...args: any) => void} - Decorator
 */
type HttpUserAuthPermission = {
  required?: boolean;
  roles?: UserRole[];
};

//TODO: check logic
export const HttpUserAuth = (
  permission?: HttpUserAuthPermission,
): ((...args: any) => void) => {
  const useGuards = [HttpUserLocalAuthGuard];
  let meta: CustomDecorator<string>;
  if (!permission) meta = SetMetadata('roles', null);
  else {
    const { required, roles } = permission;
    const isRequired = required === undefined ? true : required;
    if (!isRequired) return applyDecorators();
    const rolesMeta = roles === undefined ? [] : roles;
    meta = SetMetadata('roles', rolesMeta);
  }
  return applyDecorators(meta, UseGuards(...useGuards));
};
