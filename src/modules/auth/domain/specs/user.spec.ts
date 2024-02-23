import { Specification } from '@common';
import { User } from '../user';
import { UserRole } from '../user-role';

export class IsAdminSpec extends Specification<User> {
  constructor() {
    super();
  }

  isSatisfiedBy(candidate: User) {
    return candidate.role === UserRole.ADMIN;
  }
}

export class IsUserSpec extends Specification<User> {
  constructor() {
    super();
  }

  isSatisfiedBy(candidate: User) {
    return candidate.role === UserRole.USER;
  }
}

export class IsVerifiedSpec extends Specification<User> {
  constructor() {
    super();
  }

  isSatisfiedBy(candidate: User) {
    return candidate.isVerified;
  }
}

export class IsRemovedSpec extends Specification<User> {
  constructor() {
    super();
  }

  isSatisfiedBy(candidate: User) {
    return candidate.removedAt !== null;
  }
}

export class QualifiedForRegistrationAdminSpec extends Specification<User> {
  constructor() {
    super();
  }

  isSatisfiedBy(candidate: User) {
    const isRemoved = new IsRemovedSpec();
    const isVerified = new IsVerifiedSpec();
    const isAdmin = new IsAdminSpec();

    return isVerified
      .and(isRemoved.not())
      .and(isAdmin)
      .isSatisfiedBy(candidate);
  }
}

export class QualifiedForEditProfileSpec extends Specification<{
  editer: User;
  target: User;
}> {
  constructor() {
    super();
  }

  isSatisfiedBy(candidate: { editer: User; target: User }) {
    const { editer, target } = candidate;

    const isVerified = new IsVerifiedSpec();
    const isRemoved = new IsRemovedSpec();
    const isAdmin = new IsAdminSpec();

    if (editer.id === target.id)
      return isVerified.and(isRemoved.not()).isSatisfiedBy(target);
    else
      return isVerified.and(isRemoved.not()).and(isAdmin).isSatisfiedBy(editer);
  }
}

export class ViewProfileSpec extends Specification<{
  viewer: User;
  target: User;
}> {
  constructor() {
    super();
  }

  isSatisfiedBy(candidate: { viewer: User; target: User }) {
    const { viewer, target } = candidate;

    const isVerified = new IsVerifiedSpec();
    const isRemoved = new IsRemovedSpec();
    const isAdmin = new IsAdminSpec();

    if (viewer.id === target.id)
      return isVerified.and(isRemoved.not()).isSatisfiedBy(target);
    else
      return isVerified.and(isRemoved.not()).and(isAdmin).isSatisfiedBy(viewer);
  }
}
