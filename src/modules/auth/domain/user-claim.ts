import { Specification } from '@common';
import { User } from './user';

export class UserClaim {
  userId: string;
  email: string;
  isVerified: boolean;
  role: string;
}

export type TAccessControllList = 'admin:register';

export interface IUserPolicy {
  name: TAccessControllList;
  specification?: Specification<User>; // TODO: Change to UserClaim
}
export type TPolicies = Readonly<{ [key in TAccessControllList]: IUserPolicy }>;
