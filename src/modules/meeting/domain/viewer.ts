import { Participant } from './participant';

export class Viewer extends Participant {
  constructor(props: { id: string; name: string }) {
    super({ id: props.id, name: props.name, role: 'VIEWER' });
  }
}
