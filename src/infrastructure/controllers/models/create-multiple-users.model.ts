import { IsArray, ValidateNested } from 'class-validator';
import { CreateUserBody } from './create-user.model';

export class CreateMultipleUsersBody {
  @IsArray()
  @ValidateNested({ each: true })
  users: CreateUserBody[];
}
