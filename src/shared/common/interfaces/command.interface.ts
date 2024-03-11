import { Either } from 'fp-ts/lib/Either';
import { IErrorDetail } from './app-error.interface';

export type TCommandResult = Either<IErrorDetail[], void>;
