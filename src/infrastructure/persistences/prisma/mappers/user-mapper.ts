import { AuthProvider, IUserProps, User, UserRole } from '@modules/auth';
import {
  User as PrismaUser,
  AuthProvider as PrismaAuthProvider,
  UserRole as PrismaUserRole,
} from '@prisma/client';

export class UserMapper {
  static toDomain(orm: PrismaUser): User {
    const {
      id,
      firstName,
      lastName,
      email,
      password,
      authProvider,
      role,
      isVerified,
      avatarUrl,
      createdAt,
      updatedAt,
      removedAt,
    } = orm;

    return User.new({
      id,
      firstName,
      lastName,
      email,
      password,
      authProvider: authProvider as AuthProvider,
      role: role as UserRole,
      isVerified,
      avatarUrl,
      createdAt,
      updatedAt,
      removedAt,
    });
  }

  static toORM(domain: IUserProps): PrismaUser {
    const {
      id,
      firstName,
      lastName,
      email,
      password,
      authProvider,
      role,
      isVerified,
      avatarUrl,
      createdAt,
      updatedAt,
      removedAt,
    } = domain;

    return {
      id,
      firstName,
      lastName,
      email,
      password,
      authProvider: authProvider as PrismaAuthProvider,
      role: role as PrismaUserRole,
      isVerified,
      avatarUrl,
      createdAt,
      updatedAt,
      removedAt,
    };
  }
}
