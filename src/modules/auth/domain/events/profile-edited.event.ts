import { IEvent } from '@nestjs/cqrs';

export class ProfileEditedEvent implements IEvent {
  public readonly email: string;
  public readonly name?: string;
  public readonly avatarUrl?: string;
  constructor(params: { email: string; name?: string; avatarUrl?: string }) {
    if (params.name) this.name = params.name;
    if (params.avatarUrl) this.avatarUrl = params.avatarUrl;
    this.email = params.email;
  }
}
