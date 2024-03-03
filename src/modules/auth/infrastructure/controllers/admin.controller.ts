import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import { isLeft } from 'fp-ts/lib/Either';

import * as Shared from '@shared';
import * as App from '../../application';
import * as Domain from '../../domain';
import * as Common from '../../common';

import { UserParams } from './view-models';

@NestCommon.Controller('admin/users')
export class AdminController {
  constructor(
    private readonly commandBus: NestCQRS.CommandBus,
    private readonly queryBus: NestCQRS.QueryBus,
  ) {}

  @NestCommon.Get(':userId')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async getProfile(@NestCommon.Param() params: UserParams) {
    const query = new App.GetProfileQuery(params.userId);
    const result: App.TGetProfileQueryResult =
      await this.queryBus.execute(query);
    if (isLeft(result)) return result.left;
    return result.right;
  }
}
