import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { CqrsModule } from './cqrs.module';
import { InfrastructureModule } from './infrastructure.module';

@Module({
  imports: [InfrastructureModule, CqrsModule, UserModule],
})
export class RootModule {}
