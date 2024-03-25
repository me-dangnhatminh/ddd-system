import { Room } from '../room';

export abstract class IRoomService {
  abstract rentRoom(name: string): Room;
  abstract getRentedRoom(id: string): Room;
}
