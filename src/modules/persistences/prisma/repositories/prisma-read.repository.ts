import { ReadRepository } from '@common';
import { PrismaService } from '../prisma.service';

export class PrismaReadRepository implements ReadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async $query<T = any>(
    query: TemplateStringsArray,
    values?: any[],
  ): Promise<T> {
    return await this.prisma.$queryRaw<T>(query, values);
  }
}
