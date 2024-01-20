import { GetUsersDTO } from '@modules/user/dtos/get-users.dto';
import { GetUsersQuery } from '@modules/user/queries/get-users.query';
import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('users')
export class UsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('')
  async getUsers() {
    const query = new GetUsersQuery();
    const result = await this.queryBus.execute<any, GetUsersDTO[]>(query);
    return result;
  }
}
