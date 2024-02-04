import { ICommand } from '@nestjs/cqrs/dist';
import { ICreateUserData, User } from '../../domain';
import { IErrorDetail, Result } from '@common';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly data: ICreateUserData) {}
}

export type RegisterUserCommandResult = Result<User, IErrorDetail>;
