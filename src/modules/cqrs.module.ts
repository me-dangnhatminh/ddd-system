import { Global } from '@nestjs/common';
import { CqrsModule as NestCqrsModule } from '@nestjs/cqrs';

@Global()
export class CqrsModule extends NestCqrsModule {}
