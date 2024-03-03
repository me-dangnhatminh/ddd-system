export abstract class Specification<T> {
  abstract isSatisfiedBy(candidate: T): boolean;
  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }
  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other);
  }
  not(): Specification<T> {
    return new NotSpecification(this);
  }
}

export class AndSpecification<T> extends Specification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>,
  ) {
    super();
  }
  isSatisfiedBy(candidate: T): boolean {
    return (
      this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate)
    );
  }
}

export class OrSpecification<T> extends Specification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>,
  ) {
    super();
  }
  isSatisfiedBy(candidate: T): boolean {
    return (
      this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate)
    );
  }
}

export class NotSpecification<T> extends Specification<T> {
  constructor(private spec: Specification<T>) {
    super();
  }
  isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate);
  }
}

// export class SubsumptionSpecification<T> extends Specification<T> {
//   constructor(
//     private left: Specification<T>,
//     private right: Specification<T>,
//   ) {
//     super();
//   }
//   isSatisfiedBy(candidate: T): boolean {
//     return (
//       this.left.isSatisfiedBy(candidate) && !this.right.isSatisfiedBy(candidate)
//     );
//   }
// }

// export class CompositeSpecification<T> extends Specification<T> {
//   private specs: Specification<T>[];
//   constructor(...specs: Specification<T>[]) {
//     super();
//     this.specs = specs;
//   }
//   isSatisfiedBy(candidate: T): boolean {
//     return this.specs.every((spec) => spec.isSatisfiedBy(candidate));
//   }
// }
