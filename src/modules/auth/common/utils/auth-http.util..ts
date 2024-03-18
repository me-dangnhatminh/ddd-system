import { AuthErrorType } from '../constants';
import { HttpStatus } from '@nestjs/common';

const ErrorTypeToHttpStatus: Record<AuthErrorType, number> = {
  [AuthErrorType.UserAlreadyExists]: HttpStatus.CONFLICT,
  [AuthErrorType.UserNotExists]: HttpStatus.NOT_FOUND,
  [AuthErrorType.EmailAlreadyExists]: HttpStatus.CONFLICT,
  [AuthErrorType.EmailAlreadyVerified]: HttpStatus.CONFLICT,
  [AuthErrorType.PasswordInvalid]: HttpStatus.BAD_REQUEST,
  [AuthErrorType.UsernameAlreadyExists]: HttpStatus.CONFLICT,
  [AuthErrorType.UsernameInvalid]: HttpStatus.BAD_REQUEST,
  [AuthErrorType.InvalidCredentials]: HttpStatus.UNAUTHORIZED,
  [AuthErrorType.InvalidEmailCode]: HttpStatus.BAD_REQUEST,
  [AuthErrorType.PermissionDenied]: HttpStatus.FORBIDDEN,
  [AuthErrorType.NotSignedIn]: HttpStatus.UNAUTHORIZED,
  [AuthErrorType.InvalidSignInToken]: HttpStatus.UNAUTHORIZED,
};

export const getHttpStatusFromErrorType = (
  type: string,
): number | undefined => {
  return ErrorTypeToHttpStatus[type] ?? undefined;
};
