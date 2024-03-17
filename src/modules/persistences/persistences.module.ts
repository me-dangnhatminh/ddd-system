import * as Shared from '@shared';

import { IUserRepository } from '@modules/auth';
import { Global, Module, Provider, Scope } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaReadRepository,
  PrismaUserRepository,
} from './prisma/repositories';

const PrismaProvider: Provider = {
  provide: PrismaService,
  useClass: PrismaService,
  scope: Scope.DEFAULT,
};

const ReadRepositoryProvider: Provider = {
  provide: Shared.ReadRepository,
  useClass: PrismaReadRepository,
  scope: Scope.DEFAULT,
};

const UserRepositoryProvider: Provider = {
  provide: IUserRepository,
  useClass: PrismaUserRepository,
  scope: Scope.DEFAULT,
};

const providers: Provider[] = [
  PrismaProvider,
  ReadRepositoryProvider,
  UserRepositoryProvider,
];

@Global()
@Module({ providers, exports: providers })
export class PersistencesModule {}
