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
}
