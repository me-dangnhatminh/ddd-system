import { Either } from 'fp-ts/lib/Either';
import { IErrorDetail } from './app-error.interface';

export type TQueryResult<T> = Either<IErrorDetail[], T>;
