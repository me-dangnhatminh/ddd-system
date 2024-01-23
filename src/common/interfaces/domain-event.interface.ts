export abstract class DomainEvent {
  public readonly recordedOn: Date = new Date();
  constructor(public readonly occurredOn: Date) {}
  abstract handle(): void;
}
