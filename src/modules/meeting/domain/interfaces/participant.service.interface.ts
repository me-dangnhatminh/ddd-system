import { Participant } from '../participant-of-room';

export abstract class IParticipantService {
  abstract registerParticipant(name: string): Participant;
}
