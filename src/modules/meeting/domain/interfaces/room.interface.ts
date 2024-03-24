import {
  IAnonymousOfRoom,
  IGuestOfRoom,
} from './participant-of-room.interface';

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
  signedInRequired: boolean;
  roomType: RoomTypes;
}

export interface IPublicRoomSettings extends IRoomSettings {
  type: RoomTypes.Public;
}

export abstract class IRoom {
  protected id: string;
  protected name: string;
  protected settings: IRoomSettings;
  protected state: RoomStates;
}

export abstract class IPrivateRoom extends IRoom {
  protected settings: IRoomSettings & { roomType: RoomTypes.Private };
}

export abstract class IPublicRoom extends IRoom {
  public id: string;
  public name: string;
  public state: RoomStates;
  public settings: IPublicRoomSettings;

  abstract joinRoom(part: IAnonymousOfRoom | IGuestOfRoom): void;
}
