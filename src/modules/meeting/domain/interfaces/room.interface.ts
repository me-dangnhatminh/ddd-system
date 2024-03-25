export enum RoomTypes {
  Public = 'public',
  Private = 'private',
}

export interface IRoomSettings {
  maxParticipants: number;
  roomType: RoomTypes;
}

export interface IRoom {
  id: string;
  name: string;
  settings: IRoomSettings;
}
