export class SignedUpUserEvent {
  public readonly id: string;
  public readonly email: string;
  public readonly username: string;
  public readonly role: string;
  public readonly isVerified: boolean;
  constructor(params: {
    id: string;
    email: string;
    username: string;
    role: string;
    isVerified: boolean;
  }) {
    this.id = params.id;
    this.email = params.email;
    this.username = params.username;
    this.role = params.role;
    this.isVerified = params.isVerified;
  }
}
