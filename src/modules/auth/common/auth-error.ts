import { AppError, IErrorDetail } from '@shared';
import { AuthErrorType } from './constants';

export interface IAuthErrorDetail extends IErrorDetail {
  type: AuthErrorType;
}

export class AuthError extends AppError {}
