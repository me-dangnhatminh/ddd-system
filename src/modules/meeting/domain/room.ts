import { Participant } from './participant';

export enum RoomType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface IRoomProps {
  id: string;
  title: string;
  type: RoomType;
  description: string;
  startDate: Date;
  endDate: Date | null;
  participants: Map<Participant['id'], Participant>;
  createrId: string;
}

export interface IRoom extends IRoomProps {
  addParticipant(part: Participant): void;
  removeParticipant(part: Participant): void;
  updateParticipant(part: Participant): void;
  lockRoom(): void;
  unlockRoom(): void;
  closeRoom(): void;
}

export interface ICreateRoomData {
  id?: string;
  title: string;
  type?: RoomType;
  description: string;
  startDate: Date;
  endDate: Date | null;
  participants?: Map<Participant['id'], Participant>;
  createrId: string;
}

export class Room implements IRoom {
  get id(): string {
    return this.props.id;
  }
  get title(): string {
    return this.props.title;
  }
  get description(): string {
    return this.props.description;
  }
  get startDate(): Date {
    return this.props.startDate;
  }
  get endDate(): Date | null {
    return this.props.endDate;
  }

  get participants(): Map<Participant['id'], Participant> {
    return this.props.participants;
  }
  get createrId(): string {
    return this.props.createrId;
  }
  get type(): RoomType {
    return this.props.type;
  }

  private constructor(private props: IRoomProps) {}
  static create(data: ICreateRoomData): Room {
    return new Room({
      id: data.id ?? '',
      title: data.title,
      type: data.type ?? RoomType.PUBLIC,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      participants: data.participants ?? new Map(),
      createrId: data.createrId,
    });
  }

  addParticipant(part: Participant): void {
    this.props.participants.set(part.id, part);
  }
  removeParticipant(part: Participant): void {
    this.props.participants.delete(part.id);
  }
  updateParticipant(part: Participant): void {
    this.props.participants.set(part.id, part);
  }
  lockRoom(): void {
    if (this.props.type === RoomType.PRIVATE)
      throw new Error('Room is already locked');
    this.props.type = RoomType.PRIVATE;
  }
  unlockRoom(): void {
    if (this.props.type === RoomType.PUBLIC)
      throw new Error('Room is already unlocked');
    this.props.type = RoomType.PUBLIC;
  }
  closeRoom(): void {
    this.props.endDate = new Date();
  }
}
