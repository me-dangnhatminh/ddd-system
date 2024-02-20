import * as Either from 'fp-ts/lib/Either';
import { ApiResponse, ErrorTypes, IErrorDetail } from '@common';
import { mapErrorTypeToHttpCode } from './http-status.util';

export class EitherToApiResponse {
  static async fold<T>(
    either: Either.Either<IErrorDetail, T>,
  ): Promise<ApiResponse<T | void>> {
    return Either.fold<IErrorDetail, any, ApiResponse>(
      (err) =>
        ApiResponse.error({
          code: mapErrorTypeToHttpCode(err.type as ErrorTypes),
          message: err.message,
        }),
      (res) => {
        const resEmpty = res === undefined || res === null;
        return resEmpty ? ApiResponse.success() : ApiResponse.success(res);
      },
    )(either);
  }
}
