export enum AuthErrorType {
  UserAlreadyExists = 'user-already-exists',
  UserNotExists = 'user-not-exists',
  EmailAlreadyExists = 'email-already-exists',
  PasswordInvalid = 'password-invalid',
  UsernameAlreadyExists = 'username-already-exists',
  UsernameInvalid = 'username-invalid',
  InvalidCredentials = 'invalid-credentials',
  EmailCodeInvalid = 'email-code-invalid',
  PermissionDenied = 'user-permission-denied',
  EmailVerified = 'email-verified',
  NotSignedIn = 'not-signed-in',
  InvalidSignInToken = 'invalid-sign-in-token',
}
