import { Specification } from '@common';
import { User } from './user';
import { isActiveSpec, isAdminSpec } from './specs';

export class UserClaim {
  userId: string;
  email: string;
  isVarified: boolean;
  role: string;
}

export type TAccessControlList = 'admin:register';
export interface IUserPolicy {
  name: TAccessControlList;
  specification?: Specification<User>; // TODO: Change to UserClaim
}
export type TPolicies = Readonly<{ [key in TAccessControlList]: IUserPolicy }>;

export const policies: TPolicies = Object.freeze({
  'admin:register': {
    name: 'admin:register',
    specification: isActiveSpec.and(isAdminSpec),
  },
});
