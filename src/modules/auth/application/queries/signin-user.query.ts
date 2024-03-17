import { IQuery } from '@nestjs/cqrs';
import { TQueryResult } from '@shared';

export class SignInUserQuery implements IQuery {
  public readonly email: string;
  public readonly password: string;

  constructor(data: { email: string; password: string }) {
    this.email = data.email;
    this.password = data.password;
  }
}

export class SignInUserQueryResult {
  public readonly token: string;
  public readonly expiresIn: number;

  constructor(data: { token: string; expiresIn: number }) {
    this.token = data.token;
    this.expiresIn = data.expiresIn;
  }
}

export type TSignInUserQueryResult = TQueryResult<SignInUserQueryResult>;
