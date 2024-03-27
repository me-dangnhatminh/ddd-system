export class UserClaim {
  sub: string;
  email: string;
  isVerified: boolean;
  role: string;
  expiredAt: number;
}

export class EmailVerificationClaim {
  email: string;
  code: string;
  expiredAt: number;
}

export class PassResetClaim {
  email: string;
  sid: string; // seceret id
  expiredAt: number;
}
