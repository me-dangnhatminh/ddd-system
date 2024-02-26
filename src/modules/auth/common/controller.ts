import { IErrorDetail, ApiResponse, IErrorResponse } from '@common';
import { Either, isRight } from 'fp-ts/lib/Either';
// import { ApiResponse } from '@nestjs/swagger';

export class Controller {
  fromEither<R>(
    either: Either<IErrorDetail[], R>,
    code: number = 500,
    message: string = 'Internal Server Error',
  ): ApiResponse<R | undefined, IErrorResponse> {
    if (isRight(either)) return ApiResponse.success(either.right ?? undefined);
    return ApiResponse.fail({ detail: either.left, code, message });
  }
}
