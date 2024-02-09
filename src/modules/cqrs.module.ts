import { Global } from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';

@Global()
export class CqrsModule extends NestCQRS.CqrsModule {}
