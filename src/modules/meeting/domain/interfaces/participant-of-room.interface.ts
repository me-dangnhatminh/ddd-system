import {
  IOwer,
  IGuest,
  IAnonymous,
  IAttendee,
  IParticipant,
} from './participant.interface';
import { IRoom } from './room.interface';

export abstract class IParticipantOfRoom {
  constructor(
    protected info: IParticipant,
    protected roomId: IRoom['id'],
    protected isBanned: boolean,
  ) {}
}

export abstract class IParticipantBannedOfRoom extends IParticipantOfRoom {
  protected isBanned: true;
  abstract requestToJoinRoom(): void;
}

export abstract class IGuestOfRoom extends IParticipantOfRoom {
  protected info: IGuest;
  protected isBanned: false;
}

export abstract class IAttendeeOfRoom extends IParticipantOfRoom {
  protected info: IAttendee;
  protected isBanned: false;
}

export abstract class IAnonymousOfRoom extends IParticipantOfRoom {
  protected info: IAnonymous;
  protected isBanned: false;
}

export abstract class IOwerOfRoom extends IParticipantOfRoom {
  protected info: IOwer;
  protected isBanned: false;

  abstract kickPart(
    part: IGuestOfRoom | IAttendeeOfRoom | IAnonymousOfRoom,
  ): void;
  abstract banPart(
    part: IGuestOfRoom | IAttendeeOfRoom | IAnonymousOfRoom,
  ): void;
  abstract unbanPart(part: IParticipantBannedOfRoom): void;

  abstract closeRoom(): void;
  abstract lockRoom(): void;
  abstract unlockRoom(): void;
}
