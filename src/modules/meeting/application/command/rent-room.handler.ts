import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RentRoomCommand } from './rent-room.command';

@CommandHandler(RentRoomCommand)
export class RentRoomHandler implements ICommandHandler<RentRoomCommand> {
  // private readonly roomService: RoomService,
  // private readonly eventPublisher: EventPublisher,
  constructor() {}

  async execute(command: RentRoomCommand) {
    // if get all participants asign to room aggregate, will memory leak, how to solve this?
    // how to rent a room
    // register a room in room service
  }
}
