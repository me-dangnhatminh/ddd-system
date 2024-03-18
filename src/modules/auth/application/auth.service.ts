import { JwtService } from '@nestjs/jwt';
import { CodeVerifClaim, UserClaim } from '../domain';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import { MailerService } from '@nestjs-modules/mailer';

const TOKEN_EXPIRATION = 60 * 60 * 24 * 7; // 7 days

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    @Inject('CACHE_MANAGER') private readonly cacheService: Cache,
  ) {}

  /**
   * @returns a 6-digit code
   */
  static generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async requestEmailVerification(email: string): Promise<void> {
    const code = AuthService.generateCode();

    const key = `email-verify-code:${email}`;
    const ttl = 5 * 60; // 5 minutes
    await this.cacheService.set(key, code, ttl * 1000); // cache v5 in milliseconds
    await this.sendEmailVerificationCode({ email, code, expensedIn: ttl });
  }

  async verifyEmailCode(email: string, code: string): Promise<boolean> {
    const key = `email-verify-code:${email}`;
    const cachedCode = await this.cacheService.get(key);
    if (cachedCode !== code) return false;
    await this.cacheService.del(key);
    return true;
  }

  async genAndSaveAuthToken(
    claims: UserClaim,
  ): Promise<{ token: string; expiresIn: number }> {
    const token = this.jwtService.sign(claims, { expiresIn: TOKEN_EXPIRATION });
    await this.cacheService.set(
      `token:${claims.email}`,
      token,
      TOKEN_EXPIRATION * 1000,
    );
    return { token, expiresIn: TOKEN_EXPIRATION };
  }

  async getAuthToken(email: string): Promise<string> {
    const token = await this.findAuthToken(email);
    if (!token) throw new Error('Token already exists');
    return token;
  }

  async findAuthToken(email: string): Promise<string | null> {
    const token = await this.cacheService.get(`token:${email}`);
    if (!token) return null;
    if (typeof token !== 'string') throw new Error('Invalid token');
    return token;
  }

  private async sendEmailVerificationCode(calim: CodeVerifClaim) {
    const html = `
      <h1>Email Verification Code</h1>
      <p>Enter the following code to verify your email:</p>
      <h2>${calim.code}</h2>
      <p>This code will expire in 5 minutes.</p>
    `;

    await this.mailerService.sendMail({
      to: calim.email,
      subject: 'Email Verification Code',
      html,
    });
  }
}
