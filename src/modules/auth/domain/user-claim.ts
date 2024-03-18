import * as Shared from '@shared';

import { User } from './user';

export class UserClaim {
  sub: string;
  email: string;
  isVerified: boolean;
  role: string;
}

export class CodeVerifClaim {
  email: string;
  code: string;
  expensedIn: number;
}

export type TAccessControllList = 'admin:register';

export interface IUserPolicy {
  name: TAccessControllList;
  specification?: Shared.Specification<User>; // TODO: Change to UserClaim
}
export type TPolicies = Readonly<{ [key in TAccessControllList]: IUserPolicy }>;
