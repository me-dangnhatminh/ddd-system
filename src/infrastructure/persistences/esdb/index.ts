import {
  EventStoreDBClient,
  JSONEventType,
  jsonEvent,
} from '@eventstore/db-client';
import { Logger, OnModuleInit } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
export class EventStoreService implements OnModuleInit {
  private readonly connectionString =
    'esdb://127.0.0.1:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000';

  private readonly client: EventStoreDBClient;
  constructor() {
    this.client = EventStoreDBClient.connectionString(this.connectionString);
  }
  async onModuleInit() {
    try {
      type TestEvent = JSONEventType<
        'TestEvent',
        {
          entityId: string;
          importantData: string;
        }
      >;

      const event = jsonEvent<TestEvent>({
        type: 'TestEvent',
        data: {
          entityId: uuid(),
          importantData: 'I wrote my first event!',
        },
      });
      await this.client.appendToStream('my-stream', event);

      const result = await this.client.readStream('my-stream').toArray();
      console.log(result);
      Logger.log('Event Storage Connected', EventStoreService.name);
    } catch (error) {
      Logger.error(error, EventStoreService.name);
    }
  }
}
