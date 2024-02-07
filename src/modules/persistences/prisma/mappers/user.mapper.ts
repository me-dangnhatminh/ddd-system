import * as ORM from '@prisma/client';
import * as Domain from '@modules/auth';

export class UserMapper {
  public static toDomain(raw: ORM.User): Domain.User {
    const nameResult = Domain.UserName.create(raw.firstName, raw.lastName);
    const passwordResult = Domain.UserPassword.create(raw.password);
    const emailResult = Domain.UserEmail.create(raw.email);
    if (nameResult._tag === 'Left') throw new Error(nameResult.left.message);
    if (passwordResult._tag === 'Left')
      throw new Error(passwordResult.left.message);
    if (emailResult._tag === 'Left') throw new Error(emailResult.left.message);

    return Domain.User.new({
      id: raw.id,
      name: nameResult.right,
      email: emailResult.right,
      password: passwordResult.right,
      role: raw.role as Domain.UserRole,
      avatarUrl: raw.avatarUrl,
      authProvider: raw.authProvider as Domain.AuthProvider,
      isVerified: raw.isVerified,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      removedAt: raw.removedAt,
    });
  }
  public static toOrm(domain: Domain.User): ORM.User {
    return {
      id: domain.id,
      firstName: domain.firstName,
      lastName: domain.lastName,
      email: domain.email,
      password: domain.password,
      role: domain.role as unknown as ORM.UserRole,
      avatarUrl: domain.avatarUrl,
      authProvider: domain.authProvider,
      isVerified: domain.isVerified,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      removedAt: domain.removedAt,
    };
  }
}
