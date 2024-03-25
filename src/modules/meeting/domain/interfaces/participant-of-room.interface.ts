import { IParticipant, ParticipantRole } from './participant.interface';

export interface IParticipantOfRoom<
  TRole extends ParticipantRole = ParticipantRole,
> extends IParticipant {
  roomId: string;
  role: TRole;
  isBannded: boolean;
}

export interface IGuestOfRoom
  extends IParticipantOfRoom<ParticipantRole.Guest> {}

export interface IAttendeeOfRoom
  extends IParticipantOfRoom<ParticipantRole.Attendee> {}

export interface IAnonymousOfRoom
  extends IParticipantOfRoom<ParticipantRole.Anonymous> {}

export interface IOwerOfRoom extends IParticipantOfRoom<ParticipantRole.Owner> {
  isBannded: false;
}

export type TCreateParticipant<T extends ParticipantRole> = (
  role: T,
  isBannded?: boolean,
) => IParticipantOfRoom<T>;
export type TCreateGuest = (
  role: ParticipantRole.Guest,
  isBannded?: boolean,
) => IGuestOfRoom;
export type TCreateAttendee = (
  role: ParticipantRole.Attendee,
  isBannded?: boolean,
) => IAttendeeOfRoom;
export type TCreateAnonymous = (
  role: ParticipantRole.Anonymous,
  isBannded?: boolean,
) => IAnonymousOfRoom;

export type TCreateOwner = (
  role: ParticipantRole.Owner,
  isBannded: false,
) => IOwerOfRoom;

export interface IParticipantOfRoomFactory {
  createGuest: TCreateGuest;
  createAttendee: TCreateAttendee;
  createAnonymous: TCreateAnonymous;
  createOwner: TCreateOwner;
}
