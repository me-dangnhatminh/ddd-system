import { ICommand } from '@nestjs/cqrs/dist';
import { ICreateUserData } from '../../domain';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly data: ICreateUserData) {}
}
