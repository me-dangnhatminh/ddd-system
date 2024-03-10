import { IErrorDetail } from '@shared';

export enum AuthErrorType {
  AUTH_UserNotExists = 'AUTH_UserNotExists',
  Auth_InvalidCredentials = 'Auth_InvalidCredentials',
  Auth_EmailExists = 'Auth_EmailExists',
  Auth_EmailConflict = 'Auth_EmailConflict',
  AUTH_EmailCodeInvalid = 'AUTH_EmailCodeInvalid',
  Auth_SignInTokenInvalid = 'Auth_SignInTokenInvalid',
  Auth_NotSignedIn = 'Auth_NotSignedIn',
  Auth_NotConfirmed = 'Auth_NotConfirmed',
  Auth_VerifiedEmail = 'Auth_VerifiedEmail',
}

export const AuthInvalidCredentials: IErrorDetail = {
  type: AuthErrorType.Auth_InvalidCredentials,
  title: 'Invalid credentials',
  detail: 'Email or password is incorrect',
};

export const AuthEmailExists: IErrorDetail = {
  type: AuthErrorType.Auth_EmailExists,
  title: 'Email exists',
  detail: 'Email used, please use another email',
};

export const AuthUserNotExists: IErrorDetail = {
  type: AuthErrorType.AUTH_UserNotExists,
  title: 'User not exists',
  detail: 'User not exists',
};

export const AuthSignInTokenInvalid: IErrorDetail = {
  type: AuthErrorType.Auth_SignInTokenInvalid,
  title: 'Token invalid',
  detail: 'Sign In token is invalid',
};

export const AuthNotSignedIn: IErrorDetail = {
  type: AuthErrorType.Auth_NotSignedIn,
  title: 'Not signed in',
  detail: 'User is not signed in, please sign in',
};

export const AuthEmailCodeInvalid: IErrorDetail = {
  type: AuthErrorType.AUTH_EmailCodeInvalid,
  title: 'Email code invalid',
  detail: 'Code is invalid or expired, please request a new code',
};

export const AuthVerifiedEmail: IErrorDetail = {
  type: AuthErrorType.Auth_VerifiedEmail,
  title: 'Email verified',
  detail: 'Email is already verified',
};
