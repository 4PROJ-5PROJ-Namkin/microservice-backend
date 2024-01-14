import { IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContractsInput {
  @ApiProperty({ example: 'Eis', description: 'Client Name' })
  @IsNotEmpty({ message: 'Client name should not be empty' })
  client_name: string;

  @ApiProperty({ example: '2024-01-25', description: 'Date' })
  @IsDate({ message: 'Date is not valid' })
  @Type(() => Date)
  date: Date;

  @ApiProperty({ example: '[99, 25.99]', description: 'array of Prices ID' })
  @IsArray({ message: 'Cash should be an array' })
  cash: number[];

  @ApiProperty({ example: '[1, 3]', description: 'array of Parts ID' })
  @IsArray({ message: 'Parts should be an array' })
  parts: number[];
}
