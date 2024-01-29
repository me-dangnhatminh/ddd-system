import * as UserModule from '@modules/auth';
import { PrismaService } from '../prisma.service';
import { UserMapper } from '../mappers';
import { Injectable } from '@nestjs/common';
import { IFindOptions } from '@common';

@Injectable()
export class PrismaUserRepository implements UserModule.UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findMany(
    query: Record<string, any>,
    options?: IFindOptions,
  ): Promise<UserModule.User[]> {
    const where = query;
    const take = options?.limit;
    const skip = options?.offset;
    const orderBy = options?.orderBy
      ? { [options.orderBy]: options.order }
      : undefined;

    return await this.prismaService.user
      .findMany({ where, take, skip, orderBy })
      .then((users) => users.map((user) => UserMapper.toDomain(user)));
  }

  async saveMany(_data: UserModule.IUserProps[]): Promise<void> {
    const data = _data.map((user) => UserMapper.toORM(user));
    await this.prismaService.user.createMany({ data });
  }

  async save(user: UserModule.IUserProps): Promise<void> {
    const data = UserMapper.toORM(user);
    return await this.prismaService.user.create({ data }).then();
  }

  async createMany(_data: UserModule.ICreateUserProps[]): Promise<void> {
    const data = _data.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = user;
      return rest;
    });
    await this.prismaService.user.createMany({ data });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.prismaService.user.deleteMany({ where: { id: { in: ids } } });
  }

  async update(user: UserModule.User): Promise<void> {
    const data = UserMapper.toORM(user);
    await this.prismaService.user.update({ where: { id: user.id }, data });
  }

  async create(input: UserModule.IUserProps): Promise<UserModule.User> {
    // ignore id
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = UserMapper.toORM(input);
    const user = this.prismaService.user.create({ data });
    return await user.then((u) => UserMapper.toDomain(u));
  }

  async getAll(): Promise<UserModule.User[]> {
    const users = this.prismaService.user.findMany();
    return await users.then((u) => u.map((user) => UserMapper.toDomain(user)));
  }

  async exists(id: string): Promise<boolean> {
    return await this.prismaService.user
      .findFirst({ where: { id } })
      .then((user) => !!user);
  }

  async getUserById(id: string): Promise<UserModule.User | null> {
    const user = this.prismaService.user.findFirst({ where: { id } });
    return await user.then((u) => (u ? UserMapper.toDomain(u) : null));
  }

  async getUserByEmail(email: string): Promise<UserModule.User | null> {
    const user = this.prismaService.user.findFirst({ where: { email } });
    return await user.then((u) => (u ? UserMapper.toDomain(u) : null));
  }
}
