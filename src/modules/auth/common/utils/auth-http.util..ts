// import { AuthErrorType } from '../constants';

// const ErrorTypeToHttpStatus: Record<AuthErrorType, number> = {
//   [AuthErrorType.NOT_LOGGED_IN]: 401,
//   [AuthErrorType.INVALID_CREDENTIALS]: 401,
//   [AuthErrorType.EMAIL_CONFLICT]: 409,
//   [AuthErrorType.PASSWORD_INCORRECT]: 401,
//   [AuthErrorType.VERIFY_INVALID_CODE]: 401,
//   [AuthErrorType.TOKEN_EXPIRED]: 401,
//   [AuthErrorType.ALREADY_VERIFIED]: 400,
//   [AuthErrorType.CODE_REQUIRED_FOR_CONFIRMATION]: 400,
// };

// export const getHttpStatusFromErrorType = (
//   type: string,
// ): number | undefined => {
//   return ErrorTypeToHttpStatus[type] ?? undefined;
// };
