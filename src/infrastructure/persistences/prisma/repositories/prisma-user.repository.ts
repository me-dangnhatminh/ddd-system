import * as UserModule from '@modules/user';
import { PrismaService } from '../prisma.service';
import { UserMapper } from '../mappers';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/user/domain/interfaces';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async update(user: UserModule.User): Promise<void> {
    const data = UserMapper.toORM(user);
    await this.prismaService.user.update({ where: { id: user.id }, data });
  }

  create(input: UserModule.IUserProps): Promise<UserModule.User> {
    // ignore id
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = UserMapper.toORM(input);
    const user = this.prismaService.user.create({ data });
    return user.then((u) => UserMapper.toDomain(u));
  }

  getAll(): Promise<UserModule.User[]> {
    const users = this.prismaService.user.findMany();
    return users.then((u) => u.map((user) => UserMapper.toDomain(user)));
  }

  save(user: UserModule.IUserProps): Promise<void> {
    const data = UserMapper.toORM(user);
    return this.prismaService.user.create({ data }).then();
  }
  exists(id: string): Promise<boolean> {
    return this.prismaService.user
      .findFirst({ where: { id } })
      .then((user) => !!user);
  }

  getUserById(id: string): Promise<UserModule.User | null> {
    const user = this.prismaService.user.findFirst({ where: { id } });
    return user.then((u) => (u ? UserMapper.toDomain(u) : null));
  }
  getUserByEmail(email: string): Promise<UserModule.User | null> {
    const user = this.prismaService.user.findFirst({ where: { email } });
    return user.then((u) => (u ? UserMapper.toDomain(u) : null));
  }
}
