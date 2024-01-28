import { ICommand } from '@nestjs/cqrs/dist';
import { ICreateUserProps } from '../../domain';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly data: ICreateUserProps) {}
}
