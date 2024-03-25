import { IParticipantOfRoom } from './participant-of-room.interface';
import { IParticipant } from './participant.interface';

export enum RoomStates {
  Open = 'open',
  Closed = 'closed',
  Locked = 'locked',
}

export enum RoomTypes {
  Public = 'public',
  Private = 'private',
}

export interface IRoomSettings {
  maxParticipants: number;
  // signedInRequired: boolean;
  roomType: RoomTypes;
}

export abstract class IRoom {
  protected id: string;
  protected name: string;
  protected settings: IRoomSettings;
  protected state: RoomStates;
  protected participants: Map<IParticipant['id'], IParticipant>;

  abstract getParticipant(partId: string): IParticipantOfRoom;
}
