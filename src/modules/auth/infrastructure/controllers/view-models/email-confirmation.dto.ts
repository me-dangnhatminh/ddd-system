import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class EmailConfirmationBody {
  @IsOptional() @IsNumber() @Min(1000) @Max(9999) code?: number;
}
