import { AggregateRoot } from '@nestjs/cqrs';
import {
  IAnonymousOfRoom,
  IAttendeeOfRoom,
  IGuestOfRoom,
  IOwerOfRoom,
  IParticipant,
  IParticipantOfRoom,
  IRoom,
  ParticipantRole,
} from './interfaces';
import {
  ParticipantBannedEvent,
  ParticipantJoinedEvent,
  ParticipantLeavedEvent,
} from './events';
import {
  isAttendee,
  isGuest,
  isOwner,
  ParticipantOfRoomSpecification,
} from './specs/participant.spec';

export class Participant extends AggregateRoot implements IParticipant {
  public readonly id: string;
  public readonly name: string;
  public readonly userId?: string;

  constructor(props: IParticipant) {
    super();
    this.autoCommit = false;

    this.id = props.id;
    this.name = props.name;
    this.userId = props.userId;
  }
}

export class ParticipantOfRoom<TRole extends ParticipantRole = ParticipantRole>
  extends Participant
  implements IParticipantOfRoom<TRole>
{
  public roomId: string;
  public role: TRole;
  public isBannded: boolean;

  constructor(props: IParticipantOfRoom<TRole>) {
    super(props);
    this.roomId = props.roomId;
    this.role = props.role;
    this.isBannded = props.isBannded;
  }

  joinRoom() {
    if (this.isBannded) throw new Error('You are banned from this room');
    this.apply(new ParticipantJoinedEvent(this));
  }

  leaveRoom() {
    if (this.isBannded) throw new Error('You are banned from this room');
    this.apply(new ParticipantLeavedEvent(this));
  }
}

export class GuestOfRoom
  extends ParticipantOfRoom<ParticipantRole.Guest>
  implements IGuestOfRoom
{
  constructor(props: IGuestOfRoom) {
    super(props);
  }
}

export class AttendeeOfRoom
  extends ParticipantOfRoom<ParticipantRole.Attendee>
  implements IAttendeeOfRoom
{
  constructor(props: IAttendeeOfRoom) {
    super(props);
  }
}

export class AnonymousOfRoom
  extends ParticipantOfRoom<ParticipantRole.Anonymous>
  implements IAnonymousOfRoom
{
  constructor(props: IAnonymousOfRoom) {
    super(props);
  }
}

export class OwerOfRoom
  extends ParticipantOfRoom<ParticipantRole.Owner>
  implements IOwerOfRoom
{
  public isBannded: false;
  constructor(props: IOwerOfRoom) {
    super(props);
  }

  kickParticipant(part: AnonymousOfRoom | AttendeeOfRoom | GuestOfRoom) {
    if (part.roomId !== this.roomId) throw new Error('Participant not in room');
    part.leaveRoom();
  }

  banParticipant(part: AnonymousOfRoom | AttendeeOfRoom | GuestOfRoom) {
    if (part.roomId !== this.roomId) throw new Error('Participant not in room');
    part.isBannded = true;
    this.apply(new ParticipantBannedEvent(part));
  }
}

// ------ Participant Factory

export class ParticipantOfRoomFactory {
  constructor(protected readonly room: IRoom) {}

  create(participant: IParticipantOfRoom) {
    const spec = new ParticipantOfRoomSpecification(this.room);
    if (!spec.isSatisfiedBy(participant))
      throw new Error('Participant not in room');
    else if (isGuest.isSatisfiedBy(participant))
      return new GuestOfRoom(participant);
    else if (isOwner.isSatisfiedBy(participant))
      return new OwerOfRoom(participant);
    else if (isAttendee.isSatisfiedBy(participant))
      return new AttendeeOfRoom(participant);
    else throw new Error('Invalid participant');
  }
}
