import { ReadRepository } from '@common';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaReadRepository implements ReadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async $query<T = unknown>(
    query: TemplateStringsArray,
    ...values: any[]
  ): Promise<T> {
    return await this.prisma.$queryRaw<T>(query, ...values);
  }

  async $queryUnsafe<T = unknown>(query: string, ...values: any[]): Promise<T> {
    return await this.prisma.$queryRawUnsafe<T>(query, ...values);
  }
}
