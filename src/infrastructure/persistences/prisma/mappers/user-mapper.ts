import { User, UserRole } from '@modules/user';
import { User as PrismaUser } from '@prisma/client';

export class UserMapper {
  static toDomain(orm: PrismaUser): User {
    const domainResult = User.create({
      id: orm.id,
      name: orm.name,
      email: orm.email,
      password: orm.password,
      role: orm.role as UserRole,
    });
    if (!domainResult.isSuccess())
      throw new Error(`Error mapping user: ${domainResult.error}`);
    return domainResult.value;
  }

  static toORM(domain: User): PrismaUser {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      role: domain.role,
    };
  }
}
