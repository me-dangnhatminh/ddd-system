import { IErrorDetail } from './error-detail.interface';

export interface IErrorResponse {
  code: number; // HTTP status code
  message: string;
  errors?: IErrorDetail[];
}
