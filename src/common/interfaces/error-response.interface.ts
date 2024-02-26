import { IErrorDetail } from './error-detail.interface';

export interface IErrorResponse {
  code: number;
  message: string;
  detail?: IErrorDetail[];
}
