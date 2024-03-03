import { IAggregateRoot } from './interfaces/aggregate-root.interface';
import { IDomainEvent } from './interfaces/domain-event.interface';

// eslint-disable-next-line @typescript-eslint/ban-types
interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
type DomainEventType = Type<IDomainEvent>;

export abstract class AggregateRoot<BaseDomainEvent extends DomainEventType>
  implements IAggregateRoot
{
  private readonly _events: Map<string, IDomainEvent> = new Map();
  constructor(public readonly id: string) {
    this.id = id;
  }

  addDomainEvent<T extends BaseDomainEvent>(event: T): void {
    // Add the domain event to this aggregate's list of domain events
    this._events.set(event.name, new event());
  }
}
