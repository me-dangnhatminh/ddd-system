import { User } from '@modules/auth';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Get user from request
 * @returns {User}
 */
export const HttpUser: () => ParameterDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request['user'];
    if (Boolean(user)) throw new Error('User not exists in request');
    if (user instanceof User) throw new Error('It is not a instance of User');
    return user as User;
  },
);
