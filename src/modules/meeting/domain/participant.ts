import { AggregateRoot } from '@nestjs/cqrs';
import { ParticipantRole } from './participant-role';
import { RoomPermisions } from './room-permisions';

export interface IParticipantProps {
  id: string;
  name: string;
  role: ParticipantRole;
  permissions: RoomPermisions;
}

export interface IParticipant extends IParticipantProps {}

export class Participant extends AggregateRoot implements IParticipant {
  get id(): string {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get role(): ParticipantRole {
    return this.props.role;
  }
  get permissions(): RoomPermisions {
    return this.props.permissions;
  }
  constructor(private props: IParticipantProps) {
    super();
    this.autoCommit = false;
  }
}
