import { IErrorDetail } from '@common';
import { Either } from 'fp-ts/lib/Either';

export type TQueryHandlerResult<T> = Either<IErrorDetail[], T>;
