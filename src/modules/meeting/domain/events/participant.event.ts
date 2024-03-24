export class ParticipantJoinedEvent {
  public readonly roomId: string;
  public readonly participantId: string;

  constructor(params: { roomId: string; participantId: string }) {
    this.roomId = params.roomId;
    this.participantId = params.participantId;
  }
}
