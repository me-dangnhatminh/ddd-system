import { Specification } from '@common';
import { User } from '../user';
import { UserRole } from '../user-role';

export class UserSpecification extends Specification<User> {
  isSatisfiedBy(candidate: User) {
    return candidate.role === UserRole.USER;
  }
}

export class AdminSpecification extends Specification<User> {
  isSatisfiedBy(candidate: User) {
    return candidate.role === UserRole.ADMIN;
  }
}

export class VerifiedSpecification extends Specification<User> {
  isSatisfiedBy(candidate: User) {
    return candidate.isVerified;
  }
}

export class ActiveSpecification extends Specification<User> {
  isSatisfiedBy(candidate: User) {
    return candidate.removedAt === null;
  }
}

export const isUserSpec = new UserSpecification();
export const isAdminSpec = new AdminSpecification();
export const isVerifiedSpec = new VerifiedSpecification();
export const isActiveSpec = new ActiveSpecification();
