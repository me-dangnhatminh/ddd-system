import { Specification } from '@shared';
import {
  IAttendeeOfRoom,
  IGuestOfRoom,
  IOwerOfRoom,
  IParticipantOfRoom,
  IRoom,
  ParticipantRole,
} from '../interfaces';

export class ParticipantOfRoomSpecification extends Specification<IParticipantOfRoom> {
  constructor(protected readonly room: IRoom) {
    super();
  }
  isSatisfiedBy(candidate: IParticipantOfRoom): boolean {
    return candidate.roomId === this.room.id;
  }
}

export class GuestSpecification extends Specification<IParticipantOfRoom> {
  isSatisfiedBy(candidate: IParticipantOfRoom): candidate is IGuestOfRoom {
    return candidate.role === ParticipantRole.Guest;
  }
}

export class AttendeeSpecification extends Specification<IParticipantOfRoom> {
  isSatisfiedBy(candidate: IParticipantOfRoom): candidate is IAttendeeOfRoom {
    return candidate.role === ParticipantRole.Attendee;
  }
}

export class OwnerSpecification extends Specification<IParticipantOfRoom> {
  isSatisfiedBy(candidate: IParticipantOfRoom): candidate is IOwerOfRoom {
    return candidate.role === ParticipantRole.Owner && !candidate.isBannded;
  }
}

export const isGuest = new GuestSpecification();
export const isAttendee = new AttendeeSpecification();
export const isOwner = new OwnerSpecification();
