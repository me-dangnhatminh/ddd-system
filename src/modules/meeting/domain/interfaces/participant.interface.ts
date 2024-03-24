export enum ParticipantRole {
  Owner = 'owner', // This is role for the user who created the room
  Guest = 'guest', // This is role for the user invited
  Attendee = 'attendee', // This is role for the user who joined the room
  Anonymous = 'anonymous', // This is role for the user who joined the room without sign in
}

export abstract class IParticipant {
  id: string;
  name: string;
  role: ParticipantRole;
}

export abstract class IOwer extends IParticipant {
  role: ParticipantRole.Owner;
}

export abstract class IGuest extends IParticipant {
  role: ParticipantRole.Guest;
}

export abstract class IAttendee extends IParticipant {
  role: ParticipantRole.Attendee;
}

export abstract class IAnonymous extends IParticipant {
  role: ParticipantRole.Anonymous;
}

// Participant factory
export interface ICreateParticipantData {
  name: string;
  role: ParticipantRole;
}

export interface ICreateOwnerData extends ICreateParticipantData {
  role: ParticipantRole.Owner;
}

export interface ICreateGuestData extends ICreateParticipantData {
  role: ParticipantRole.Guest;
}

export interface ICreateAttendeeData extends ICreateParticipantData {
  role: ParticipantRole.Attendee;
}

export interface ICreateAnonymousData extends ICreateParticipantData {
  role: ParticipantRole.Anonymous;
}

export interface IParticipantFactory {
  create(data: ICreateOwnerData): IOwer;
  create(data: ICreateGuestData): IGuest;
  create(data: ICreateAttendeeData): IAttendee;
  create(data: ICreateAnonymousData): IAnonymous;
}
