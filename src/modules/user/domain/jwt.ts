import { UserRole } from './user-role';

export interface JWTClaims {
  userId: string;
  isEmailVerified: boolean;
  email: string;
  username: string;
  role: UserRole;
}
export type JWTToken = string;
export type SessionId = string;
export type RefreshToken = string;
