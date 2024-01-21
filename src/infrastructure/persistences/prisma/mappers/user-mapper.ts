import { IUserProps, User, UserRole } from '@modules/user';
import { User as PrismaUser } from '@prisma/client';

export class UserMapper {
  static toDomain(orm: PrismaUser): User {
    const { id, name, email, password } = orm;
    const role = orm.role as UserRole;
    const createdAt = new Date();
    const updatedAt = null;
    const removedAt = null;

    const userResult = User.create(
      { id, name, email, password, role, createdAt, updatedAt, removedAt },
      false,
    );
    if (!userResult.isSuccess()) throw new Error(userResult.error);
    return userResult.value;
  }

  static toORM(domain: IUserProps): PrismaUser {
    const { id, name, email, password, role } = domain;
    return { id, name, email, password, role };
  }
}
