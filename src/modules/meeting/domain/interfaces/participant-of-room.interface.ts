import {
  IOwer,
  IGuest,
  IAnonymous,
  IAttendee,
  IParticipant,
} from './participant.interface';
import { IRoom } from './room.interface';

export abstract class IParticipantOfRoom {
  protected info: IParticipant;
  protected roomId: IRoom['id'];
}

export abstract class IGuestOfRoom extends IParticipantOfRoom {
  protected info: IGuest;
}

export abstract class IAttendeeOfRoom extends IParticipantOfRoom {
  protected info: IAttendee;
}

export abstract class IAnonymousOfRoom extends IParticipantOfRoom {
  protected info: IAnonymous;
}

export abstract class IOwerOfRoom extends IParticipantOfRoom {
  protected info: IOwer;

  abstract kickPart(
    part: IGuestOfRoom | IAttendeeOfRoom | IAnonymousOfRoom,
  ): void;
  abstract closeRoom(): void;
  abstract lockRoom(): void;
  abstract unlockRoom(): void;
}
