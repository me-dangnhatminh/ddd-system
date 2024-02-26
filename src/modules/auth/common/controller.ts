import { IErrorDetail, IErrorResponse } from '@common';
import { Either } from 'fp-ts/lib/Either';

export class Controller {
  fromEither<R>(
    either: Either<IErrorDetail[], R>,
    code: number = 500,
    message: string = 'Internal Server Error',
  ) {
    throw new Error('Not implemented');
  }
}
