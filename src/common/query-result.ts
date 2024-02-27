import { Either } from 'fp-ts/lib/Either';
import { IErrorDetail } from './interfaces';

export type TQueryResult<T = never> = Either<IErrorDetail[], T>;
