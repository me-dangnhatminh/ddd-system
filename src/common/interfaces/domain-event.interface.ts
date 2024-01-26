export interface IDomainEvent {
  occurredAt: Date;
  getAggregateId(): string;
}
