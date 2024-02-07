import { ICommand } from '@nestjs/cqrs';
import { IDataRegisterUser } from '../../domain';

export class RegisterUserCommand implements ICommand {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly password: string;

  constructor(data: IDataRegisterUser) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
  }
}
