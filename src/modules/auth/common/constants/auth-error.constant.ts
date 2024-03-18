import { AuthErrorType } from './auth-error-type.constant';
import { AuthError } from '../auth-error';
import { UserPassword } from '../../domain';

const userAlreadyExists = () => {
  return new AuthError(
    AuthErrorType.UserAlreadyExists,
    'User exists',
    'User already exists, check email or username',
  );
};

const userNotExits = (email: string) => {
  return new AuthError(
    AuthErrorType.UserNotExists,
    'User not exists',
    `User with email ${email} not exists`,
  );
};

const emailAlreadyExists = (email: string) => {
  return new AuthError(
    AuthErrorType.EmailAlreadyExists,
    'Email exists',
    `${email} already exists`,
  );
};
const emailAlreadyVerified = () => {
  return new AuthError(
    AuthErrorType.EmailAlreadyVerified,
    'Email verified',
    'Email already verified',
  );
};

const usernameAlreadyExists = (username: string) => {
  return new AuthError(
    AuthErrorType.UsernameAlreadyExists,
    'Username exists',
    `${username} used, please use another username`,
  );
};

const passwordInvalid = () => {
  return new AuthError(
    AuthErrorType.PasswordInvalid,
    'Password invalid',
    UserPassword.INVALID_MESSAGE,
  );
};

const permissionDenied = () => {
  return new AuthError(
    AuthErrorType.PermissionDenied,
    'Permission denied',
    'Permission denied',
  );
};

const invalidCredentials = () => {
  return new AuthError(
    AuthErrorType.InvalidCredentials,
    'Invalid credentials',
    'Email or password is incorrect',
  );
};

const invalidSignInToken = () => {
  return new AuthError(
    AuthErrorType.InvalidSignInToken,
    'Invalid sign in token',
    'Sign in token is invalid',
  );
};

const notSignedIn = () => {
  return new AuthError(
    AuthErrorType.NotSignedIn,
    'Not signed in',
    'User is not signed in, please sign in',
  );
};

const invalidEmailCode = () => {
  return new AuthError(
    AuthErrorType.InvalidEmailCode,
    'Email code invalid',
    'Code is invalid or expired, please request a new code',
  );
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
