import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserParams {
  @IsNotEmpty() @IsUUID() userId: string;
}
