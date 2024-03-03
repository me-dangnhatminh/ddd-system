import { Either } from 'fp-ts/lib/Either';
import { IErrorDetail } from './interfaces';

export type TCommandResult<T = undefined> = Either<IErrorDetail, T>;
