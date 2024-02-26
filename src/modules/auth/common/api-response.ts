import { IErrorResponse, Result } from '@common';
export type ApiResponse<
  S = never,
  F extends IErrorResponse = IErrorResponse,
> = Result<S, F>;

export function success<S = never>(data: S): ApiResponse<S> {
  return { isSuccess: true, data };
}

export function failure<F extends IErrorResponse = IErrorResponse>(
  error: F,
): ApiResponse<never, F> {
  return { isSuccess: false, error };
}
