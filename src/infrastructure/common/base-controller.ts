import { ApiResponse, IErrorDetail } from '@common';

export class BaseController {
  protected constructor() {}

  internal(
    message: string = 'Internal Server Error',
    errors?: IErrorDetail[],
  ): ApiResponse<undefined> {
    return ApiResponse.error({ code: 500, message, errors });
  }

  notFound(
    message: string = 'Not Found',
    errors?: IErrorDetail[],
  ): ApiResponse<undefined> {
    return ApiResponse.error({ code: 404, message, errors });
  }

  badRequest(
    message: string = 'Bad Request',
    errors?: IErrorDetail[],
  ): ApiResponse<undefined> {
    return ApiResponse.error({ code: 400, message, errors });
  }

  conflict(
    message: string = 'Conflict',
    errors?: IErrorDetail[],
  ): ApiResponse<undefined> {
    return ApiResponse.error({ code: 409, message, errors });
  }

  forbidden(
    message: string = 'Forbidden',
    errors?: IErrorDetail[],
  ): ApiResponse<undefined> {
    return ApiResponse.error({ code: 403, message, errors });
  }

  unauthorized(
    message: string = 'Unauthorized',
    errors?: IErrorDetail[],
  ): ApiResponse<undefined> {
    return ApiResponse.error({ code: 401, message, errors });
  }

  unprocessableEntity(
    message: string = 'Unprocessable Entity',
    errors?: IErrorDetail[],
  ): ApiResponse<undefined> {
    return ApiResponse.error({ code: 422, message, errors });
  }
}
