import { Participant } from './participant';
import { ParticipantRole } from './participant-role';

export class Organizer extends Participant {
  constructor(props: { id: string; name: string }) {
    super({ id: props.id, name: props.name, role: ParticipantRole.ORGANIZER });
  }
}
