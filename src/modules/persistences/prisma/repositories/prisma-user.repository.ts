/* eslint-disable @typescript-eslint/no-unused-vars */
import * as UserModule from '@modules/auth';
import { PrismaService } from '../prisma.service';
import { UserMapper } from '../mappers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserModule.UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  getAll(): Promise<UserModule.User[]> {
    return this.prismaService.user
      .findMany()
      .then((users) => users.map(UserMapper.toDomain));
  }
  getById(id: string): Promise<UserModule.User | null> {
    return this.prismaService.user
      .findUnique({ where: { id } })
      .then((user) => (user ? UserMapper.toDomain(user) : null));
  }
  getByEmail(email: string): Promise<UserModule.User | null> {
    return this.prismaService.user
      .findUnique({ where: { email } })
      .then((user) => (user ? UserMapper.toDomain(user) : null));
  }
  save(user: UserModule.User): Promise<void> {
    const { id, ...data } = UserMapper.toOrm(user);
    return this.prismaService.user.create({ data }).then();
  }
  deleteByIds(ids: string[]): Promise<void> {
    return this.prismaService.user
      .deleteMany({ where: { id: { in: ids } } })
      .then();
  }
  count(): Promise<number> {
    return this.prismaService.user.count();
  }
}
