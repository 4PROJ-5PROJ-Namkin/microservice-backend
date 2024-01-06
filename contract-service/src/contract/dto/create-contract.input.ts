import { IsNotEmpty, Length, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateContractInput {
  @IsNotEmpty({ message: 'Contract number should not be empty' })
  @Length(3, 100, { message: 'Contract number must be between 3 and 100 characters long' })
  contract_number: string;

  @IsNotEmpty({ message: 'Client name should not be empty' })
  client_name: string;

  @IsDate({ message: 'Date is not valid' })
  @Type(() => Date)
  date: Date;

  @IsArray({ message: 'Cash should be an array' })
  cash: number[];

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
