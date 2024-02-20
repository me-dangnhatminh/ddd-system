import { ErrorTypes, IErrorDetail } from '@common';

export const CONFLICT_EMAIL: IErrorDetail = {
  type: ErrorTypes.CONFLICT,
  message: 'Email already exists',
};
