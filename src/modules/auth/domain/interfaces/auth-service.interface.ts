import {
  EmailVerificationClaim,
  PassResetClaim,
  UserClaim,
} from '../user-claim';

export abstract class IAuthService {
  //----- Auth
  abstract genAndSaveAuthToken(claim: UserClaim): Promise<string>;
  abstract getAuthToken(email: string): Promise<string | null>;
  abstract validateAuthToken(token: string): Promise<UserClaim | null>;
  abstract saveUserClaim(claim: UserClaim): Promise<void>;
  abstract getUserClaim(email: string): Promise<UserClaim | null>;
  abstract deleteAuthToken(email: string): Promise<void>;

  // ----- Email Verification
  abstract saveEmailVerifyClaim(claim: EmailVerificationClaim): Promise<void>;
  abstract getEmailVerifyClaim(
    email: string,
  ): Promise<EmailVerificationClaim | null>;
  abstract sendEmailVerification(claim: EmailVerificationClaim): Promise<void>;

  // ----- Password Reset
  abstract savePassResetClaim(claim: PassResetClaim): Promise<void>;
  abstract getPassResetClaim(email: string): Promise<PassResetClaim | null>;
  abstract sendPasswordResetEmail(claim: PassResetClaim): Promise<void>;
}
