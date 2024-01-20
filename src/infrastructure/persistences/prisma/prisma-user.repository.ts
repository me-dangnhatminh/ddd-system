import * as UserModule from '@modules/user';
import * as Prisma from '@prisma/client';
import { UserRepository } from 'src/modules/user/interfaces/user-repository.interface';
import { PrismaService } from './prisma.service';
import { UserMapper } from './mappers';
import { Inject } from '@nestjs/common';

export class PrismaUserRepository implements UserRepository {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
  ) {}
  getAll(): Promise<UserModule.User[]> {
    const users = this.prismaService.user.findMany();
    return users.then((us) => us.map((u) => UserMapper.toDomain(u)));
  }

  save(user: UserModule.User): Promise<void> {
    const userORM: Prisma.User = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      password: user.password,
    };
    this.prismaService.user.create({ data: userORM });
    return Promise.resolve();
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
  getUserByEmail(email: string): Promise<UserModule.User> {
    const user = this.prismaService.user.findFirst({ where: { email } });
    return user.then((u) => (u ? UserMapper.toDomain(u) : null));
  }
}
