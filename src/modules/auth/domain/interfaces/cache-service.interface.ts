export abstract class UserCacheService {
  abstract getEmailVerificationCode(email: string): Promise<number | undefined>;
  abstract setEmailVerificationCode(
    email: string,
    code: number,
    ttl: number, // in miliseconds
  ): Promise<void>;
  abstract getUserToken(email: string): Promise<string | undefined>;
  abstract setUserToken(
    email: string,
    token: string,
    ttl: number,
  ): Promise<void>;
}
