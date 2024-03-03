import { IErrorDetail } from '../interfaces';

export const isErrorDetail = (error: any): error is IErrorDetail => {
  if (
    error &&
    typeof error === 'object' &&
    'type' in error &&
    'title' in error &&
    'detail' in error &&
    typeof error.type === 'string' &&
    typeof error.title === 'string' &&
    typeof error.detail === 'string'
  )
    return true;
  else return false;
};

export const overwriteErrorDetail = (
  errorDetail: IErrorDetail,
  detail?: string,
): IErrorDetail => {
  return {
    ...errorDetail,
    detail: detail ?? errorDetail.detail,
  };
};
