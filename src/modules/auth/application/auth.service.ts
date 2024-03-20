import { JwtService } from '@nestjs/jwt';
import {
  EmailVerificationClaim,
  PasswordResetClaim,
  UserClaim,
} from '../domain';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import { MailerService } from '@nestjs-modules/mailer';
import { IAuthService } from '../domain/interfaces/auth-service.interface';

const PASS_PHRASE = 'password-reset'; // TODO: use a real private key, and move to env

const isUserClaim = (claim: any): claim is UserClaim => {
  return (
    typeof claim === 'object' &&
    typeof claim.email === 'string' &&
    typeof claim.role === 'string'
  );
};

const isPasswordResetClaim = (claim: any): claim is PasswordResetClaim => {
  return (
    typeof claim === 'object' &&
    typeof claim.email === 'string' &&
    typeof claim.expiredAt === 'number'
  );
};

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    @Inject('CACHE_MANAGER') private readonly cacheService: Cache,
  ) {}
  async genAndSaveAuthToken(claim: UserClaim): Promise<string> {
    const { email, expiredAt } = claim;
    const expiresIn = Math.floor((expiredAt - Date.now()) / 1000); // convert to seconds
    const token = this.jwtService.sign(claim, { expiresIn });
    await this.cacheService.set(`auth-token:${email}`, token, expiresIn);
    return token;
  }
  async validateAuthToken(token: string): Promise<UserClaim | null> {
    const decoded = this.jwtService.decode(token);
    if (!decoded || !isUserClaim(decoded)) return null;
    return decoded;
  }

  async getAuthToken(email: string): Promise<string | null> {
    const token = await this.cacheService.get(`auth-token:${email}`);
    if (!token) return null;
    if (typeof token === 'string') return token;
    throw new Error('Invalid token');
  }
  async generateEmailVerificationCode(
    claim: EmailVerificationClaim,
  ): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code
    const ttlMilisecond = claim.expiredAt - Date.now();
    const key = `email-verify-code:${claim.email}`;
    await this.cacheService.set(key, code, ttlMilisecond);
    return code;
  }
  async validateEmailVerificationCode(
    email: string,
    code: string,
  ): Promise<boolean> {
    const key = `email-verify-code:${email}`;
    const cachedCode = await this.cacheService.get(key);
    if (cachedCode !== code) return false;
    await this.cacheService.del(key);
    return true;
  }

  async generatePasswordResetToken(claim: PasswordResetClaim): Promise<string> {
    const { email, expiredAt } = claim;
    const expiresIn = (expiredAt - Date.now()) / 1000; // convert to seconds
    return this.jwtService.sign({ email, expiresIn }, { secret: PASS_PHRASE });
  }
  async validatePasswordResetToken(
    token: string,
  ): Promise<PasswordResetClaim | null> {
    const decoded = this.jwtService.decode(token);
    if (!decoded) return null;
    if (!isPasswordResetClaim(decoded)) throw new Error('Invalid token');
    return decoded;
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

  async sendPasswordResetToken(email: string, token: string): Promise<void> {
    const URL = 'http://localhost:5173/reset-password'; // TODO: move to env
    const html = `
      <h1>Password Reset</h1>
      <p>Click the following link to reset your password:</p>
      <a href="${URL}?token=${token}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
    `;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      html,
    });
  }
}
