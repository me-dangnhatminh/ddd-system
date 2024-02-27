import { Either } from 'fp-ts/lib/Either';
import { IErrorDetail } from './error-detail.interface';

export type TQueryResult<T> = Either<IErrorDetail[], T>;
