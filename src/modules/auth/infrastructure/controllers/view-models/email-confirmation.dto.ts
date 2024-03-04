import { IsNumber, Max, Min } from 'class-validator';

export class EmailConfirmationBody {
  @IsNumber() @Min(1000) @Max(9999) code: number;
}
