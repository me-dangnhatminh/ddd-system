import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfirmEmailCommand } from '../confirm-email.command';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailHandler
  implements ICommandHandler<ConfirmEmailCommand>
{
  constructor(private readonly jwtService: JwtService) {}

  async execute(command: ConfirmEmailCommand) {
    const { token } = command;
  }
}
