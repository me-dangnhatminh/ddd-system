import { Either } from './either.interface';
import { IErrorDetail } from './error-detail.interface';

export type TQueryResult<T> = Either<IErrorDetail[], T>;
