import { Prisma } from '@prisma/client';
import {
  IRepository,
  RepositoryType,
  UnitOfWork,
} from '@common/interfaces/persistence';
import { PrismaService } from './prisma.service';
import { UserRepository } from '@modules/user/interfaces';
// TODO: remove uow
export class PrismaUnitOfWork extends UnitOfWork {
  constructor(
    private readonly prisma: PrismaService,
    private context: Prisma.TransactionClient = prisma,
    private readonly repositories: Map<string, IRepository> = new Map(),
  ) {
    super();
  }

  private register<R extends IRepository>(repo: RepositoryType<R>) {
    const repoName = repo.name;
    switch (repoName) {
      case UserRepository.name:
        break;
      default:
        throw new Error(`Repository ${repoName} not registered`);
    }
  }
  getRepository<R extends IRepository>(repo: RepositoryType<R>): R {
    const repoName = repo.name;
    if (!this.repositories.has(repoName)) this.register(repo);
    return this.repositories.get(repoName) as R;
  }
  commit(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  rollback(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  startTransaction(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  completeTransaction(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  closeConnection(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
