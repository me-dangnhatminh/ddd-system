import * as NestCommon from '@nestjs/common';

import * as Shared from '@shared';
import { PrismaService } from '../prisma.service';

@NestCommon.Injectable()
export class PrismaReadRepository implements Shared.ReadRepository {
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
