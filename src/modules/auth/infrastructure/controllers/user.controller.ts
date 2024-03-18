import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestSwagger from '@nestjs/swagger';

import * as Domain from '../../domain';
import * as Common from '../../common';

@NestCommon.Controller('users')
@NestSwagger.ApiTags('users')
export class UserController {
  constructor(
    private readonly commandBus: NestCQRS.CommandBus,
    private readonly queryBus: NestCQRS.QueryBus,
  ) {}

  @NestCommon.Get('me')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async getMe(@Common.HttpUser() user: Domain.User) {
    return {
      id: user.id,
      email: user.email.value,
      username: user.username.value,
      name: user.name,
      isVerified: user.isVerified,
      avatarUrl: user.avatarUrl,
    };
  }
}
