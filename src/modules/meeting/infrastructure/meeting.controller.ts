import { Controller, Post } from '@nestjs/common';

@Controller('meeting')
export class MeetingController {
  constructor() {}

  @Post()
  async createMeeting() {
    // create meeting command
  }
}
