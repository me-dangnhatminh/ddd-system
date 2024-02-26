export interface Success<S> {
  isSuccess: true;
  data: S;
}
export interface Failure<F> {
  isSuccess: false;
  error: F;
}
export type Result<S = never, F = never> = Success<S> | Failure<F>;

export function success<S, F = never>(): Result<S, F>;
export function success<S, F = never>(value: S): Result<S, F>;
export function success<S, F = never>(data?: S): Result<S | undefined, F> {
  return { isSuccess: true, data };
}

export function failure<S = never, F = never>(): Result<S, F>;
export function failure<S = never, F = never>(error: F): Result<S, F>;
export function failure<S = never, F = never>(
  error?: F,
): Result<S, F | undefined> {
  return { isSuccess: false, error };
}

export function isSuccess<S, F>(result: Result<S, F>): result is Success<S> {
  return result.isSuccess;
}

export function isFailure<S, F>(result: Result<S, F>): result is Failure<F> {
  return !result.isSuccess;
}

export const Result = Object.freeze({ success, failure, isSuccess, isFailure });
