import { UserRepository } from '@modules/auth';
import { PrismaService, PrismaUserRepository } from '../persistences/prisma';
import { Global, Module, Provider, Scope } from '@nestjs/common';

const PrismaProvider: Provider = {
  provide: PrismaService,
  useClass: PrismaService,
  scope: Scope.DEFAULT,
};

const UserRepositoryProvider: Provider = {
  provide: UserRepository,
  useClass: PrismaUserRepository,
  scope: Scope.DEFAULT,
};

const providers: Provider[] = [PrismaProvider, UserRepositoryProvider];

@Global()
@Module({ providers, exports: providers })
export class PersistencesModule {}
