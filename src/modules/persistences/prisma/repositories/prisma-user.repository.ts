/* eslint-disable @typescript-eslint/no-unused-vars */
import * as UserModule from '@modules/auth';
import { PrismaService } from '../prisma.service';
import { UserMapper } from '../mappers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserModule.IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  userExits(by: { email?: string; username?: string }): Promise<boolean> {
    return this.prismaService.user
      .findFirst({
        where: { OR: [{ email: by.email }, { username: by.username }] },
      })
      .then((user) => {
        if (!user) return false;
        return true;
      });
  }

  getUserByUsername(username: string): Promise<UserModule.User | null> {
    return this.prismaService.user
      .findUnique({ where: { username } })
      .then((user) => (user ? UserMapper.toDomain(user) : null));
  }
  getUserById(id: string): Promise<UserModule.User | null> {
    return this.prismaService.user
      .findUnique({ where: { id } })
      .then((user) => (user ? UserMapper.toDomain(user) : null));
  }
  getUserByEmail(email: string): Promise<UserModule.User | null> {
    return this.prismaService.user
      .findUnique({ where: { email } })
      .then((user) => (user ? UserMapper.toDomain(user) : null));
  }
  getAdminById(id: string): Promise<UserModule.Admin | null> {
    return this.prismaService.user
      .findUnique({ where: { id, role: 'admin' } })
      .then((orm) => {
        if (!orm) return null;
        const user = UserMapper.toDomain(orm);
        if (!user.isAdmin())
          throw new Error('InvalidOperation: User is not an admin');
        return user;
      });
  }
  getAdminByEmail(email: string): Promise<UserModule.Admin | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<UserModule.User[]> {
    return this.prismaService.user
      .findMany()
      .then((users) => users.map((u) => UserMapper.toDomain(u)));
  }
  save(user: UserModule.User): Promise<void> {
    const data = UserMapper.toOrm(user);
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
  update(user: UserModule.User): Promise<void> {
    const { id, ...data } = UserMapper.toOrm(user);
    return this.prismaService.user.update({ where: { id }, data }).then();
  }
}
