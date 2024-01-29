import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteUsersQueryParamsDTO {
  @IsNotEmpty()
  @Transform((params: TransformFnParams) => `${params.value}`.split(','))
  @IsUUID('4', { each: true })
  public ids: string[];
}
