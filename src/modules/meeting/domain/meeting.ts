import { Participant } from './participant';

export interface IMeeting {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  participants: Participant[];
  createrId: string;
}

export interface IMeetingFactory {
  create(data: {
    id?: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date | null;
    participants: Participant[];
    createrId: string;
  }): IMeeting;
}

export class Meeting implements IMeeting, IMeetingFactory {
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
  get participants(): Participant[] {
    return this.props.participants;
  }
  get createrId(): string {
    return this.props.createrId;
  }

  private constructor(private props: IMeeting) {}
  create(data: {
    id?: string | undefined;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date | null;
    participants: Participant[];
    createrId: string;
  }): Meeting {
    return new Meeting({
      id: data.id || '',
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      participants: data.participants,
      createrId: data.createrId,
    });
  }
}
