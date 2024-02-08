import { User } from '../../domain';

export class VerifyEmailCommand {
  public readonly requester: User;
  public readonly code: number;

  constructor(data: { requester: User; code: number }) {
    this.requester = data.requester;
    this.code = data.code;
  }
}
