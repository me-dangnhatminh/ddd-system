import { Module } from '@nestjs/common';

import { UserModule } from './user.module';
import { CqrsModule } from './cqrs.module';
import { PersistencesModule } from './persistences.module';
import { JwtModule } from './jwt.module';
import { EventStoreModule } from './esdb.module';

@Module({
  imports: [
    PersistencesModule,
    JwtModule,
    CqrsModule,
    EventStoreModule,
    UserModule,
  ],
})
export class RootModule {}
