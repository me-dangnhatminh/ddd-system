import { IsUUID } from 'class-validator';

export class UserParams {
  @IsUUID() userId: string;
}
