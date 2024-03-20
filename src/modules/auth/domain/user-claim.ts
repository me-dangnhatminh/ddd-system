import * as Shared from '@shared';

import { User } from './user';

export class UserClaim {
  sub: string;
  email: string;
  isVerified: boolean;
  role: string;
  expiredAt: number;
}

export class EmailVerificationClaim {
  email: string;
  expiredAt: number;
}

export class PasswordResetClaim {
  email: string;
  expiredAt: number;
}

export type TAccessControllList = 'admin:register';

export interface IUserPolicy {
  name: TAccessControllList;
  specification?: Shared.Specification<User>; // TODO: Change to UserClaim
}
export type TPolicies = Readonly<{ [key in TAccessControllList]: IUserPolicy }>;
