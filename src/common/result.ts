export type Result<S, F = never> = Success<S> | Failure<F>;
export const Result = Object.freeze({ success, failure });

interface IResult<S, F> {
  isSuccess(): this is Success<S>;
  isFailure(): this is Failure<F>;
  map<U>(func: (r: S | F) => U): Result<U, F> | Result<S, U>;
  endThen<T, U>(func: (r: S | F) => Result<T, U>): Result<T, U>;
}

class Success<S> implements IResult<S, never> {
  isSuccess(): this is Success<S> {
    return true;
  }
  isFailure(): this is never {
    return false;
  }

  constructor(public readonly value: S) {}
  map<U>(func: (r: S) => U): Success<U> {
    return new Success(func(this.value));
  }
  endThen<T, U>(func: (r: S) => Result<T, U>): Result<T, U> {
    return func(this.value);
  }
}

class Failure<F> implements IResult<never, F> {
  isSuccess(): this is never {
    return false;
  }
  isFailure(): this is Failure<F> {
    return true;
  }
  constructor(public readonly error: F) {}

  map<U>(func: (r: F) => U): Failure<U> {
    return new Failure(func(this.error));
  }
  endThen<T, U>(func: (r: F) => Result<T, U>): Result<T, U> {
    return func(this.error);
  }
}

function success(): Success<undefined>;
function success<U>(value: U): Success<U>;
function success<U>(value?: U): Success<U | undefined> {
  return new Success<U | undefined>(value);
}

function failure(): Failure<undefined>;
function failure<U>(value: U): Failure<U>;
function failure<U>(value?: U): Failure<U | undefined> {
  return new Failure<U | undefined>(value);
}
