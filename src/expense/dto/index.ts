import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsNumber()
  categoryId: number;
}

export class UpdateExpenseDto {
  description?: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
