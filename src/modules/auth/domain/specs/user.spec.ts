import * as Shared from '@shared';

import { User } from '../user';
import { UserRole } from '../user-role';
import { Admin } from '../admin';
import {
  UserClaim,
  EmailVerificationClaim,
  PassResetClaim,
} from '../user-claim';

export class UserSpecification extends Shared.Specification<User> {
  isSatisfiedBy(candidate: User): this is User {
    return candidate.role === UserRole.USER;
  }
}

export class AdminSpecification extends Shared.Specification<User> {
  isSatisfiedBy(candidate: User): this is Admin {
    return candidate.role === UserRole.ADMIN;
  }
}

export class VerifiedSpecification extends Shared.Specification<User> {
  isSatisfiedBy(candidate: User) {
    return candidate.isVerified;
  }
}

export class UserClaimSpecification extends Shared.Specification<unknown> {
  isSatisfiedBy(candidate: any): candidate is UserClaim {
    return (
      typeof candidate === 'object' &&
      typeof candidate.email === 'string' &&
      typeof candidate.role === 'string'
    );
  }
}

export class EmailVerificationClaimSpecification extends Shared.Specification<EmailVerificationClaim> {
  isSatisfiedBy(candidate: any): candidate is EmailVerificationClaim {
    return (
      typeof candidate === 'object' &&
      typeof candidate.email === 'string' &&
      typeof candidate.code === 'string' &&
      typeof candidate.expiredAt === 'number'
    );
  }
}

export class PassResetClaimSpecification extends Shared.Specification<PassResetClaim> {
  isSatisfiedBy(candidate: any): candidate is PassResetClaim {
    return (
      typeof candidate === 'object' &&
      typeof candidate.email === 'string' &&
      typeof candidate.expiredAt === 'number' &&
      typeof candidate.sid === 'string'
    );
  }
}

export const isUserClaim = new UserClaimSpecification();
export const isUserSpec = new UserSpecification();
export const isAdminSpec = new AdminSpecification();
export const isVerifiedSpec = new VerifiedSpecification();
export const isEmailVerificationClaim =
  new EmailVerificationClaimSpecification();
export const isPassResetClaim = new PassResetClaimSpecification();
