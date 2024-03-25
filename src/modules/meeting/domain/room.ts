import { AggregateRoot } from '@nestjs/cqrs';
import { IParticipantOfRoom, IRoom, IRoomSettings } from './interfaces';
import {
  OwerOfRoom,
  ParticipantOfRoom,
  ParticipantOfRoomFactory,
} from './participant-of-room';

export abstract class Room extends AggregateRoot implements IRoom {
  public id: string;
  public name: string;
  public settings: IRoomSettings;

  protected owner: OwerOfRoom | undefined = undefined;
  protected participants: Map<ParticipantOfRoom['id'], ParticipantOfRoom>;

  constructor(props: IRoom, participants: IParticipantOfRoom[] = []) {
    super();
    this.autoCommit = false;

    this.id = props.id;
    this.name = props.name;
    this.settings = props.settings;

    const factory = new ParticipantOfRoomFactory(props);
    this.participants = participants.reduce((acc, participant) => {
      const part = factory.create(participant);
      if (part instanceof OwerOfRoom) this.owner = part;
      acc.set(part.id, part);
      return acc;
    }, new Map());
  }

  getParticipant(id: string): ParticipantOfRoom | undefined {
    return this.participants.get(id);
  }
}
