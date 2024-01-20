import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { CqrsModule } from './cqrs.module';
import { PersistencesModule } from './persistences.module';

@Module({
  imports: [PersistencesModule, CqrsModule, UserModule],
})
export class RootModule {}
