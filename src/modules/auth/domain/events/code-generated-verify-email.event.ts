import { IEvent } from '@nestjs/cqrs';

type TDataCodeGeneratedVerifyEmailEvent = {
  email: string;
  code: number;
  expiredAt: number;
};

export class CodeGeneratedVerifyEmailEvent implements IEvent {
  public readonly email: string;
  public readonly code: number;
  public readonly expiredAt: number;
  constructor(public readonly data: TDataCodeGeneratedVerifyEmailEvent) {
    this.email = data.email;
    this.code = data.code;
    this.expiredAt = data.expiredAt;
  }
}
