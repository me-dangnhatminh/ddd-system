import { IParticipant, IParticipantOfRoom } from '../../domain';

export abstract class RoomService {
  abstract rentRoom(): void;
  abstract closeRoom(): void;

  abstract requestToJoinRoom(participant: IParticipant): void;

  abstract getParticipant(id: string): IParticipantOfRoom;
  abstract getParticipant(participant: IParticipant): IParticipantOfRoom;
}
