import { Either } from './either.interface';
import { IErrorDetail } from './error-detail.interface';

export type TCommandResult = Either<IErrorDetail[], void>;
