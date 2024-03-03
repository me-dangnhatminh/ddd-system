import * as Shared from '@shared';

import { User } from '../user';
import { UserRole } from '../user-role';
import { Admin } from '../admin';

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

export const isUserSpec = new UserSpecification();
export const isAdminSpec = new AdminSpecification();
export const isVerifiedSpec = new VerifiedSpecification();
