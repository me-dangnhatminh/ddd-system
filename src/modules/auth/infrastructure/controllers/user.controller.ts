import { Controller, Get, OnModuleInit } from '@nestjs/common';
import {
  AggregateRoot,
  EventBus,
  EventsHandler,
  IEvent,
  IEventHandler,
} from '@nestjs/cqrs';

class DemoCreatedEvent implements IEvent {
  constructor(public readonly data: string) {}
}

@EventsHandler(DemoCreatedEvent)
export class DemoCreatedHandler implements IEventHandler<DemoCreatedEvent> {
  handle(event: DemoCreatedEvent) {
    console.log(event.data);
  }
}

class DemoAggregate extends AggregateRoot {
  constructor() {
    super();
    this.autoCommit = false;
  }
}

@Controller('users')
export class UserController implements OnModuleInit {
  constructor(private readonly eventBus: EventBus) {}
  onModuleInit() {}

  @Get('create-demo')
  async createDemo() {
    const demo = new DemoAggregate();
    demo.apply(new DemoCreatedEvent('Hello 2'));
  }
}
