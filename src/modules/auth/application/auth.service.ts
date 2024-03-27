import { JwtService } from '@nestjs/jwt';
import {
  EmailVerificationClaim,
  PassResetClaim,
  isEmailVerificationClaim,
  UserClaim,
  isUserClaim,
  isPassResetClaim,
} from '../domain';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import { MailerService } from '@nestjs-modules/mailer';
import { IAuthService } from '../domain/interfaces/auth-service.interface';
import { DateTimeUtil } from '@shared';
import {
  AUTH_TOKEN_KEY_PREFIX,
  EMAIL_CLAIM_KEY_PREFIX,
  USER_CLAIM_KEY_PREFIX,
} from '../common';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    @Inject('CACHE_MANAGER') private readonly cacheService: Cache,
  ) {}

  async saveEmailVerifyClaim(claim: EmailVerificationClaim): Promise<void> {
    const key = EMAIL_CLAIM_KEY_PREFIX`${claim.email}`;
    const expiresIn = DateTimeUtil.toExpiresIn(claim.expiredAt);
    await this.cacheService.set(key, claim, expiresIn);
  }
  async getEmailVerifyClaim(
    email: string,
  ): Promise<EmailVerificationClaim | null> {
    const key = EMAIL_CLAIM_KEY_PREFIX`${email}`;
    const claim = await this.cacheService.get(key);
    if (!claim) return null;
    const isValid = isEmailVerificationClaim.isSatisfiedBy(claim);
    if (!isValid) throw new Error('Invalid claim');
    return claim;
  }

  async sendEmailVerification(claim: EmailVerificationClaim): Promise<void> {
    const subject = 'Email Verification Code';
    const html = `
      <h1>Email Verification Code</h1>
      <p>Enter the following code to verify your email:</p>
      <h2>${claim.code}</h2>
      <p>This code will expire in 5 minutes.</p>
    `;
    await this.mailerService.sendMail({ to: claim.email, subject, html });
  }

  async genAndSaveAuthToken(claim: UserClaim): Promise<string> {
    const { email, expiredAt } = claim;
    const expiresIn = DateTimeUtil.toExpiresIn(expiredAt);
    const token = this.jwtService.sign(claim, { expiresIn });
    const key = AUTH_TOKEN_KEY_PREFIX`${email}`;
    await this.cacheService.set(key, token, expiresIn);
    return token;
  }

  async validateAuthToken(token: string): Promise<UserClaim | null> {
    const decoded = this.jwtService.decode(token);
    if (!decoded) return null;
    if (!isUserClaim.isSatisfiedBy(decoded))
      throw new Error('Invalid token, expected UserClaim');
    return decoded;
  }

  async genPassResetToken(claim: PassResetClaim): Promise<string> {
    const { email, expiredAt } = claim;
    const expiresIn = DateTimeUtil.toExpiresIn(expiredAt);
    return this.jwtService.sign({ email, expiresIn });
  }
  async validPassResetToken(token: string): Promise<PassResetClaim | null> {
    const decoded = this.jwtService.decode(token);
    if (!decoded) return null;
    const isValid = isPassResetClaim.isSatisfiedBy(decoded);
    if (!isValid) throw new Error('Invalid token, expected PasswordResetClaim');
    return decoded;
  }
  async savePassResetClaim(claim: PassResetClaim): Promise<void> {
    const key = EMAIL_CLAIM_KEY_PREFIX`${claim.email}`;
    const expiresIn = DateTimeUtil.toExpiresIn(claim.expiredAt);
    await this.cacheService.set(key, claim, expiresIn);
  }
  async getPassResetClaim(email: string): Promise<PassResetClaim | null> {
    const key = EMAIL_CLAIM_KEY_PREFIX`${email}`;
    const claim = await this.cacheService.get(key);
    if (!claim) return null;
    const isValid = isPassResetClaim.isSatisfiedBy(claim);
    if (!isValid) throw new Error('Invalid claim');
    return claim;
  }

  async saveAuthToken(email: string, token: string): Promise<void> {
    const key = AUTH_TOKEN_KEY_PREFIX`${email}`;
    await this.cacheService.set(key, token);
  }

  async getAuthToken(email: string): Promise<string | null> {
    const key = AUTH_TOKEN_KEY_PREFIX`${email}`;
    const token = await this.cacheService.get(key);
    if (!token) return null;
    if (typeof token !== 'string')
      throw new Error('Invalid token, expected string');
    return token;
  }

  async saveUserClaim(claim: UserClaim): Promise<void> {
    const key = USER_CLAIM_KEY_PREFIX`${claim.email}`;
    await this.cacheService.set(key, claim);
  }

  async getUserClaim(email: string): Promise<UserClaim | null> {
    const key = USER_CLAIM_KEY_PREFIX`${email}`;
    const claim = await this.cacheService.get(key);
    if (!claim) return null;
    if (!isUserClaim.isSatisfiedBy(claim)) throw new Error('Invalid claim');
    return claim;
  }

  async deleteAuthToken(email: string): Promise<void> {
    const key = AUTH_TOKEN_KEY_PREFIX`${email}`;
    await this.cacheService.del(key);
  }

  async sendEmailVerificationCode(email: string, code: string) {
    const html = `
      <h1>Email Verification Code</h1>
      <p>Enter the following code to verify your email:</p>
      <h2>${code}</h2>
      <p>This code will expire in 5 minutes.</p>
    `;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification Code',
      html,
    });
  }
}
