import { JwtService } from '@nestjs/jwt';
import { UserClaim } from '../domain';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';

const TOKEN_EXPIRATION = 60 * 60 * 24 * 7; // 7 days

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('CACHE_MANAGER') private readonly cacheService: Cache,
  ) {}

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
}
