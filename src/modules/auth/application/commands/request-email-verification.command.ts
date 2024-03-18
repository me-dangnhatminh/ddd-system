export class RequestEmailVerificationCommand {
  public readonly email: string;
  constructor(params: { email: string }) {
    this.email = params.email;
  }
}
