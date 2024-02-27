import { Either } from 'fp-ts/lib/Either';
import { IErrorDetail } from './error-detail.interface';

export type TCommandResult = Either<IErrorDetail[], void>;
