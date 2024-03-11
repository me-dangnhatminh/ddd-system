export enum AuthErrorType {
  UserNotExists = 'user-not-exists',
  PermissionDenied = 'user-permission-denied',
  InvalidCredentials = 'invalid-credentials',
  EmailExists = 'email-exists',
  EmailCodeInvalid = 'email-code-invalid',
  EmailVerified = 'email-verified',
  NotSignedIn = 'not-signed-in',
  InvalidSignInToken = 'invalid-sign-in-token',
}
