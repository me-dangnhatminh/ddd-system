import {
  EmailVerificationClaim,
  PasswordResetClaim,
  UserClaim,
} from '../user-claim';

export abstract class IAuthService {
  abstract genAndSaveAuthToken(claim: UserClaim): Promise<string>;
  abstract validateAuthToken(token: string): Promise<UserClaim | null>;
  abstract getAuthToken(email: string): Promise<string | null>;

  abstract generateEmailVerificationCode(
    claim: EmailVerificationClaim,
  ): Promise<string>;
  abstract validateEmailVerificationCode(
    email: string,
    code: string,
  ): Promise<boolean>;

  abstract generatePasswordResetToken(
    claim: PasswordResetClaim,
  ): Promise<string>;
  abstract validatePasswordResetToken(
    token: string,
  ): Promise<PasswordResetClaim | null>;

  // --- Mailer
  abstract sendEmailVerificationCode(
    email: string,
    code: string,
  ): Promise<void>;
  abstract sendPasswordResetToken(email: string, token: string): Promise<void>;
}
