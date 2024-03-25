import { Room } from '../room';

export abstract class IRoomSeverice {
  abstract rentRoom(name: string): void;
  abstract getRoom(id: string): Room;
}
