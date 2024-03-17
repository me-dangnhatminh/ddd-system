import * as ORM from '@prisma/client';
import * as Domain from '@modules/auth';

export class UserMapper {
  public static toDomain(orm: ORM.User): Domain.User {
    const username = Domain.Username.new(orm.username);
    const email = Domain.UserEmail.new(orm.email);
    const password = Domain.UserPassword.new(orm.password, true);
    return new Domain.User(
      orm.id,
      username,
      email,
      password,
      Domain.UserRole[orm.role],
      Domain.AuthProvider[orm.authProvider],
      orm.isVerified,
      orm.name,
      orm.avatarUrl,
      orm.registeredAt,
    );
  }
  public static toOrm(domain: Domain.User): ORM.User {
    return {
      id: domain.id,
      username: domain.username.value,
      email: domain.email.value,
      password: domain.password.value,
      role: domain.role,
      isVerified: domain.isVerified,
      authProvider: domain.authProvider,
      name: domain.name,
      avatarUrl: domain.avatarUrl,
      registeredAt: domain.registeredAt,
      updatedAt: null,
      removedAt: null,
    };
  }
}
