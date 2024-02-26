import { IErrorDetail } from './interfaces';
import { Result } from './result';

export type TCommandResult = Result<never, IErrorDetail[]>;
