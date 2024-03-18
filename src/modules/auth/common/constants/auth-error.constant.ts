import { AuthErrorType } from './auth-error-type.constant';
import { AuthError } from '../auth-error';

const userAlreadyExists = () => {
  return AuthError.new({
    type: AuthErrorType.UserAlreadyExists,
    title: 'User exists',
    detail: 'User already exists',
  });
};

const userNotExits = (email: string) => {
  return AuthError.new({
    type: AuthErrorType.UserNotExists,
    title: 'User not exists',
    detail: `${email} not exists`,
  });
};

const emailAlreadyExists = (email: string) => {
  return AuthError.new({
    type: AuthErrorType.EmailAlreadyExists,
    title: 'Email exists',
    detail: `${email} used, please use another email`,
  });
};
const emailAlreadyVerified = () => {
  return AuthError.new({
    type: AuthErrorType.EmailAlreadyVerified,
    title: 'Email already verified',
    detail: 'Email already verified',
  });
};

const usernameAlreadyExists = (username: string) => {
  return AuthError.new({
    type: AuthErrorType.UsernameAlreadyExists,
    title: 'Username exists',
    detail: `${username} used, please use another username`,
  });
};

const passwordInvalid = () => {
  return AuthError.new({
    type: AuthErrorType.PasswordInvalid,
    title: 'Password invalid',
    detail: `Password is invalid, please use another password`,
  });
};

const permissionDenied = () => {
  return AuthError.new({
    type: AuthErrorType.PermissionDenied,
    title: 'Permission denied',
    detail: 'Permission denied',
  });
};

const invalidCredentials = () => {
  return AuthError.new({
    type: AuthErrorType.InvalidCredentials,
    title: 'Invalid credentials',
    detail: 'Invalid credentials',
  });
};

const invalidSignInToken = () => {
  return AuthError.new({
    type: AuthErrorType.InvalidSignInToken,
    title: 'Invalid sign in token',
    detail: 'Invalid sign in token',
  });
};

const notSignedIn = () => {
  return AuthError.new({
    type: AuthErrorType.NotSignedIn,
    title: 'Not signed in',
    detail: 'Not signed in',
  });
};

const invalidEmailCode = () => {
  return AuthError.new({
    type: AuthErrorType.InvalidEmailCode,
    title: 'Invalid email code',
    detail: 'Invalid email code',
  });
};

export const AuthErrors = {
  userAlreadyExists,
  userNotExits,
  emailAlreadyExists,
  emailAlreadyVerified,
  usernameAlreadyExists,
  permissionDenied,
  invalidCredentials,
  invalidSignInToken,
  notSignedIn,
  invalidEmailCode,
  passwordInvalid,
};
