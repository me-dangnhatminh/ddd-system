import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import * as App from '../../../application';
import { Transform } from 'class-transformer';

// use class transformer to transform the query params

export class GetUsersPaginationnQuery {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform((params) => parseInt(params.value, 10))
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Transform((params) => parseInt(params.value, 10))
  pageSize?: number;
  @IsOptional() @IsString() search?: string;

  @IsOptional()
  @IsString()
  @IsIn(['id', 'email', 'fullname', 'createdAt', 'updatedAt'])
  orderBy?: App.TOrderBy;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  order?: App.TOrder;
}
