/* eslint-disable @typescript-eslint/no-unused-vars */
import * as UserModule from '@modules/auth';
import { PrismaService } from '../prisma.service';
import { UserMapper } from '../mappers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserModule.UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(data: UserModule.IUserProps): Promise<void> {
    const { id, ...rest } = data;
    await this.prismaService.user.update({ where: { id }, data: { ...rest } });
  }
  async saveMany(data: UserModule.IUserProps[]): Promise<void> {
    await this.prismaService.user.createMany({
      data: data.map((item) => UserMapper.toORM(item)),
    });
  }
  async create(data: UserModule.ICreateUserData): Promise<UserModule.User> {
    const user = await this.prismaService.user.create({ data });
    return UserMapper.toDomain(user);
  }
  async createMany(data: UserModule.ICreateUserData[]): Promise<void> {
    await this.prismaService.user.createMany({ data });
  }
  async getOneById(id: string): Promise<UserModule.User | null> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }
  async getOneByEmail(email: string): Promise<UserModule.User | null> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }
  async getManyByIEmail(email: string): Promise<UserModule.User[]> {
    const users = await this.prismaService.user.findMany({ where: { email } });
    return users.map((item) => UserMapper.toDomain(item));
  }
  async updateById(
    id: string,
    data: UserModule.IUpdateUserData,
  ): Promise<void> {
    await this.prismaService.user.update({ where: { id }, data });
  }
  async update(data: UserModule.User): Promise<void> {
    await this.prismaService.user.update({ where: { id: data.id }, data });
  }
  async updateMany(data: UserModule.User[]): Promise<void> {
    await this.prismaService.user.updateMany({
      data: data.map((item) => UserMapper.toORM(item)),
    });
  }
  async deleteByIds(ids: string[]): Promise<void> {
    await this.prismaService.user.deleteMany({ where: { id: { in: ids } } });
  }
  async countWith(
    field: UserModule.TUserFindField,
    options?: UserModule.IUserOptions,
  ): Promise<number> {
    const countArgs: {
      where?: any;
      skip?: number;
      take?: number;
      orderBy?: any;
    } = {};

    if (options?.search)
      countArgs.where = { [field]: { contains: options.search } };
    if (options?.limit) countArgs.take = options.limit;
    if (options?.offset) countArgs.skip = options.offset;
    if (options?.orderBy && options?.order)
      countArgs.orderBy = { [options.orderBy]: options.order };
    return await this.prismaService.user.count(countArgs);
  }
  async findMany(
    field: UserModule.TUserFindField,
    options?: UserModule.IUserOptions | undefined,
  ): Promise<UserModule.User[]> {
    const findArgs: {
      where?: { [key: string]: any };
      skip?: number;
      take?: number;
      orderBy?: any;
    } = {};

    if (options?.search)
      findArgs.where = { [field]: { contains: options.search } };
    if (options?.limit) findArgs.take = options.limit;
    if (options?.offset) findArgs.skip = options.offset;
    if (options?.orderBy && options?.order)
      findArgs.orderBy = { [options.orderBy]: options.order };

    return await this.prismaService.user
      .findMany(findArgs)
      .then((users) => users.map((item) => UserMapper.toDomain(item)));
  }
}
