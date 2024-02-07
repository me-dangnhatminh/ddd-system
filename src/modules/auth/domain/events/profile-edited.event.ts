import { IEvent } from '@nestjs/cqrs';

export class ProfileEditedEvent implements IEvent {
  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly avatarUrl: string;
  constructor(data: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  }) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.avatarUrl = data.avatarUrl;
  }
}
