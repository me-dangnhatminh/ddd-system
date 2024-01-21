import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnApplicationBootstrap
{
  constructor() {
    super();
  }

  onApplicationBootstrap() {
    return this.$connect()
      .then(() => {
        const mess = 'Prisma connected successfully';
        Logger.log(mess, PrismaService.name);
      })
      .catch((err) => {
        const mess = `Prisma connection failed: ${err}`;
        Logger.error(mess, PrismaService.name);
      });
  }
}
