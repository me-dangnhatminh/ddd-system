import { TUserFindField } from '@modules/auth';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetUsersQueryParamsDTO {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  page: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(20)
  limit?: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  @IsIn(['createdAt', 'updatedAt', 'firstName', 'lastName', 'email', 'id'])
  sortBy?: TUserFindField;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  sort?: 'asc' | 'desc';
}