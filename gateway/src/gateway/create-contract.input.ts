import { IsNotEmpty, Length, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContractInput {
  @IsNotEmpty({ message: 'Contract number should not be empty' })
  @Length(3, 100, { message: 'Contract number must be between 3 and 100 characters long' })
  @ApiProperty({ example: '2024-01-09A', description: 'Unique contract id' })
  contract_number: string;

  @ApiProperty({ example: 'Eischen', description: 'Client Name' })
  @IsNotEmpty({ message: 'Client name should not be empty' })
  client_name: string;

  @ApiProperty({ example: '2024-01-28', description: 'Date' })
  @IsDate({ message: 'Date is not valid' })
  @Type(() => Date)
  date: Date;

  @ApiProperty({ example: '[99, 25.99 , 4]', description: 'array of Prices ID' })
  @IsArray({ message: 'Cash should be an array' })
  cash: number[];

  @ApiProperty({ example: '[1, 3, 4]', description: 'array of Parts ID' })
  @IsArray({ message: 'Parts should be an array' })
  parts: number[];

  constructor(contract_number: string, client_name: string, date: Date, cash: number[], parts: number[]) {
    this.contract_number = contract_number;
    this.client_name = client_name;
    this.date = date;
    this.cash = cash;
    this.parts = parts;
  }
}
