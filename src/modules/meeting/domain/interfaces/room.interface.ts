import {
  IAnonymousOfRoom,
  IGuestOfRoom,
} from './participant-of-room.interface';
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

export abstract class IParticipantOfRoom extends IRoom {
  protected info: IParticipant;
}

export abstract class IPublicRoom extends IRoom {
  abstract registerPart(part: IParticipant): IParticipantOfRoom;
}

export abstract class IOwerOfRoom extends IRoom {
  abstract kickPart(part: IGuestOfRoom | IAnonymousOfRoom): void;
  abstract banPart(part: IGuestOfRoom | IAnonymousOfRoom): void;
  abstract unbanPart(part: IAnonymousOfRoom): void;

  abstract closeRoom(): void;
  abstract lockRoom(): void;
  abstract unlockRoom(): void;
}

export class Room {
  static registerPart(par: IParticipant): IParticipantOfRoom {
    throw new Error('Method not implemented.');
  }
}
