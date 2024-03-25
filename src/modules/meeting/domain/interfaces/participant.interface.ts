export enum ParticipantRole {
  Owner = 'owner',
  Guest = 'guest',
  Attendee = 'attendee',
  Anonymous = 'anonymous',
}

export interface IParticipant {
  id: string;
  name: string;
  userId?: string;
}
