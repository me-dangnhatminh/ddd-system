import { IUserProps, UserRole } from '@modules/user';
import { User as PrismaUser } from '@prisma/client';

export class UserMapper {
  static toDomain(orm: PrismaUser): IUserProps {
    const { id, name, email, password } = orm;
    const role = orm.role as UserRole;
    const createdAt = new Date();
    const updatedAt = null;
    const removedAt = null;
    return { id, name, email, password, role, createdAt, updatedAt, removedAt };
  }

  static toORM(domain: IUserProps): PrismaUser {
    const { id, name, email, password, role } = domain;
    return { id, name, email, password, role };
  }
}
