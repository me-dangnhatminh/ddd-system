import { Module } from '@nestjs/common';

import { UserModule } from './user.module';
import { CqrsModule } from './cqrs.module';
import { PersistencesModule } from './persistences.module';
import { JwtModule } from './jwt.module';

@Module({
  imports: [PersistencesModule, JwtModule, CqrsModule, UserModule],
})
export class RootModule {}
