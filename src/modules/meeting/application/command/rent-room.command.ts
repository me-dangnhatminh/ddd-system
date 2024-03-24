import { ICommand } from '@nestjs/cqrs';

export class RentRoomCommand implements ICommand {
  constructor(public readonly name: string) {}
}
