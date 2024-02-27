import { IErrorDetail } from './interfaces';
import { Either } from 'fp-ts/lib/Either';

export type TCommandResult<T = undefined> = Either<IErrorDetail[], T>;
