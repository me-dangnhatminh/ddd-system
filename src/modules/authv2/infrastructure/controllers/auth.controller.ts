import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Either, fold } from 'fp-ts/lib/Either';

import { RegisterUserDTO } from './view-models/register-user.dto';
import { RegisterUserCommand } from '../../application';
import { ApiResponse, IErrorDetail } from '@common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() dto: RegisterUserDTO): Promise<ApiResponse<void>> {
    const command = new RegisterUserCommand(dto);
    const result: Either<IErrorDetail, void> =
      await this.commandBus.execute(command);

    return fold<IErrorDetail, void, ApiResponse>(
      (err) => ApiResponse.error({ code: 500, message: err.message }),
      () => ApiResponse.success(),
    )(result);
  }
}
