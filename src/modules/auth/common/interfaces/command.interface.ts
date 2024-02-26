import { IErrorDetail } from '@common';
import { Either } from 'fp-ts/lib/Either';

export type TCommandHandlerResult = Either<IErrorDetail[], void>;
