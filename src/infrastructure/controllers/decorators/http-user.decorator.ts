import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@modules/auth';
import { AUTHENTICATED_USER_KEY } from '../constants';

export const HttpUser: () => ParameterDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request[AUTHENTICATED_USER_KEY];
    if (!Boolean(user)) throw new Error('User not exists in Request');
    if (!(user instanceof User))
      throw new Error('It is not a instance of User');
    return user as User;
  },
);
