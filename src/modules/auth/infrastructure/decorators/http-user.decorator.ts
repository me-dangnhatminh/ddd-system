import * as NestCommon from '@nestjs/common';
import * as Common from '../../common';
import * as Domain from '../../domain';

export const HttpUser: () => ParameterDecorator =
  NestCommon.createParamDecorator(
    (data: unknown, ctx: NestCommon.ExecutionContext): Domain.User => {
      const request: Request = ctx.switchToHttp().getRequest();
      const user = request[Common.AUTHENTICATED_USER_KEY];
      if (!Boolean(user)) throw new Error('User not exists in Request');
      if (!(user instanceof Domain.User))
        throw new Error('It is not a instance of User');
      return user as Domain.User;
    },
  );
