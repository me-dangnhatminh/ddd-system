import { IErrorDetail, Result } from '@common';
export type TQueryHandlerResult<T> = Result<T, IErrorDetail[]>;
