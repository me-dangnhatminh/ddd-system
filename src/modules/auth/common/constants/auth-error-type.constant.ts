export enum AuthErrorType {
  UserAlreadyExists = 'user-already-exists',
  UserNotExists = 'user-not-exists',
  EmailAlreadyExists = 'email-already-exists',
  EmailAlreadyVerified = 'email-already-verified',
  PasswordInvalid = 'password-invalid',
  UsernameAlreadyExists = 'username-already-exists',
  UsernameInvalid = 'username-invalid',
  InvalidCredentials = 'invalid-credentials',
  InvalidEmailCode = 'invalid-email-code',
  PermissionDenied = 'user-permission-denied',
  NotSignedIn = 'not-signed-in',
  InvalidSignInToken = 'invalid-sign-in-token',
}
