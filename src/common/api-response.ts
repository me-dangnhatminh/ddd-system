interface IMeta {
  status: number;
  // requestId: string;
}

export interface ISuccessResponse<T> {
  status: 'ok';
  meta: IMeta;
  data: T;
}

export interface IErrorResponse {
  field: string;
  message: string;
  code: string; // error code (not HTTP status code)
}

export interface IFailureResponse {
  status: 'fail';
  meta: IMeta;
  data: { errors: IErrorResponse[] };
}
