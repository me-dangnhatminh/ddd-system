import {
  PrismaService,
  PrismaUserRepository,
} from '@infrastructure/persistences/prisma';
import { UserRepository } from '@modules/user/interfaces';
import { Global, Module, Provider, Scope } from '@nestjs/common';

const PersistencesProvider: Provider[] = [
  {
    provide: PrismaService,
    useClass: PrismaService,
    scope: Scope.DEFAULT,
  },
  {
    provide: UserRepository,
    useClass: PrismaUserRepository,
  },
];

@Global()
@Module({
  providers: [...PersistencesProvider],
  exports: [...PersistencesProvider],
})
export class InfrastructureModule {}
