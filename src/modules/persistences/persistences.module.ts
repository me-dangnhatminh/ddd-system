import { UserRepository } from '@modules/auth';
import { Global, Module, Provider, Scope } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories';

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
