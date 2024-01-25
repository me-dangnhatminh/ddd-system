import { Participant } from './participant';
import { ParticipantRole } from './participant-role';
import { RoomPermisions } from './room-permisions';

export class Viewer extends Participant {
  constructor(props: {
    id: string;
    name: string;
    role: ParticipantRole;
    permissions: RoomPermisions;
  }) {
    super(props);
  }
}
