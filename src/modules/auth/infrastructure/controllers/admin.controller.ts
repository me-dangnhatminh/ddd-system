import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';

import * as Domain from '../../domain';
import * as Common from '../../common';

@NestCommon.Controller('admin/users')
export class AdminController {
  constructor(
    private readonly commandBus: NestCQRS.CommandBus,
    private readonly queryBus: NestCQRS.QueryBus,
  ) {}

  @NestCommon.Post()
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth({ roles: [Domain.UserRole.ADMIN] })
  async registerUser() {}
}
