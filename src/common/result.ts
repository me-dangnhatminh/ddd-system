export interface Success<S> {
  isSuccess: true;
  data: S;
}

export interface Failure<F> {
  isSuccess: false;
  error: F;
}

export type Result<S, F> = Success<S> | Failure<F>;
export const failure = <S, F>(error: F): Result<S, F> => ({
  isSuccess: false,
  error,
});
