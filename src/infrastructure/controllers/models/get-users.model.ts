import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UserQueryParamsDTO {
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
  @IsIn(['createdAt', 'updatedAt', 'fullname', 'email', 'role'])
  sortBy?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  sort?: 'asc' | 'desc';
}
