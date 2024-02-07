import { UserRole } from './user-role';

export interface UserJWTClaims {
  userId: string;
  isVerified: boolean;
  email: string;
  role: UserRole;
}
