import { IErrorResponse } from './interfaces';

export interface ApiSucceededResponse<S> {
  isSuccess: true;
  data: S;
}

export interface ApiFailedResponse<F> {
  isSuccess: false;
  error: F;
}

export type ApiResponse<S, F> = ApiSucceededResponse<S> | ApiFailedResponse<F>;

const success = <S = never, F = never>(data: S): ApiResponse<S, F> => ({
  isSuccess: true,
  data,
});

const fail = <S = never, F extends IErrorResponse = IErrorResponse>(
  error: F,
): ApiResponse<S, F> => ({
  isSuccess: false,
  error,
});

const isSucceeded = <S, F>(
  res: ApiResponse<S, F>,
): res is ApiSucceededResponse<S> => res.isSuccess;
const isFailed = <S, F>(res: ApiResponse<S, F>): res is ApiFailedResponse<F> =>
  !res.isSuccess;

const isApiResponse = (
  res: any,
): res is ApiResponse<unknown, IErrorResponse> => {
  if (!res) return false;
  if (typeof res !== 'object') return false;
  if (!('isSuccess' in res)) return false;
  if (typeof res.isSuccess !== 'boolean') return false;

  if (res.isSuccess) return true;

  if (!('error' in res)) return false;
  if (typeof res.error !== 'object') return false;
  if (!('code' in res.error)) return false;
  if (!('message' in res.error)) return false;

  return true;
};

export const ApiResponse = Object.freeze({
  success,
  fail,
  isSucceeded,
  isFailed,
  isApiResponse,
});
