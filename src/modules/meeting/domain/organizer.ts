import { Participant } from './participant';
import { ParticipantRole } from './participant-role';
import { RoomPermisions } from './room-permisions';

export class Organizer extends Participant {
  constructor(props: {
    id: string;
    name: string;
    role: ParticipantRole;
    permissions: RoomPermisions;
  }) {
    super({
      id: props.id,
      name: props.name,
      role: ParticipantRole.ORGANIZER,
      permissions: props.permissions,
    });
  }
}
