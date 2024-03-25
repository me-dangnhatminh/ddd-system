export class ParticipantJoinedEvent {
  public readonly id: string;
  public readonly roomId: string;

  constructor(params: { id: string; roomId: string }) {
    this.id = params.id;
    this.roomId = params.roomId;
  }
}

export class ParticipantLeavedEvent {
  public readonly id: string;
  public readonly roomId: string;

  constructor(params: { id: string; roomId: string }) {
    this.id = params.id;
    this.roomId = params.roomId;
  }
}

export class ParticipantBannedEvent {
  public readonly id: string; // participantId
  public readonly roomId: string;

  constructor(params: { id: string; roomId: string }) {
    this.id = params.id;
    this.roomId = params.roomId;
  }
}

export class ParticipantUnbannedEvent {
  public readonly id: string; // participantId
  public readonly roomId: string;

  constructor(params: { id: string; roomId: string }) {
    this.id = params.id;
    this.roomId = params.roomId;
  }
}

export class ParticipantKickedEvent {
  public readonly id: string; // participantId
  public readonly roomId: string;

  constructor(params: { id: string; roomId: string }) {
    this.id = params.id;
    this.roomId = params.roomId;
  }
}

export class ParticipantRequestedToJoinEvent {
  public readonly id: string; // participantId
  public readonly roomId: string;

  constructor(params: { id: string; roomId: string }) {
    this.id = params.id;
    this.roomId = params.roomId;
  }
}
