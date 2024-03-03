import { IErrorDetail } from '../interfaces';

export const overwriteErrorDetail = (
  errorDetail: IErrorDetail,
  detail?: string,
): IErrorDetail => {
  return {
    ...errorDetail,
    detail: detail ?? errorDetail.detail,
  };
};
