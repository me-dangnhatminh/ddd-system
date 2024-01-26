import { Global, Module, Provider } from '@nestjs/common';
import { EventStoreDBClient } from '@eventstore/db-client';
import { EventStore } from '@common/interfaces/event-store.interface';

const CONNECTION_STRING =
  'esdb://127.0.0.1:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000';

const EventStoreProvider: Provider = {
  provide: EventStore,
  useFactory: () => EventStoreDBClient.connectionString(CONNECTION_STRING),
};

@Global()
@Module({
  providers: [EventStoreProvider],
  exports: [EventStoreProvider],
})
export class EventStoreModule {}
