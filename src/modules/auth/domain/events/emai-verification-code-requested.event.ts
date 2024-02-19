import * as NestCQRS from '@nestjs/cqrs';

type TData = {
  email: string;
  code: number;
  expiredAt: number;
};

export class EmailVerificationCodeRequestedEvent implements NestCQRS.IEvent {
  public readonly email: string;
  public readonly code: number;
  public readonly expiredAt: number;
  constructor(public readonly data: TData) {
    this.email = data.email;
    this.code = data.code;
    this.expiredAt = data.expiredAt;
  }
}
