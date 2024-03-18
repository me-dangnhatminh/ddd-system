import { Either } from 'fp-ts/lib/Either';
import { AppError } from './app-error';

export type TCommandResult<T = undefined> = Either<AppError, T>;
