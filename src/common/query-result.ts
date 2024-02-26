import { IErrorDetail } from './interfaces';
import { Result } from './result';

export type TQueryResult<T = never> = Result<T, IErrorDetail[]>;
