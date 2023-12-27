export class CreateContractInput {
  contract_number: string;
  client_name: string;
  date: Date;
  cash : number[];
  parts : number[];

  constructor(contract_number: string, client_name: string, date: Date, cash : number[], parts : number[]) {
    this.validateIsNotEmpty(contract_number, 'Contract number');
    this.validateStringLength(contract_number, 3, 100, 'Contract number');
    this.validateIsNotEmpty(client_name, 'Client name');
    this.validateIsNotEmpty(date.toString(), 'Date');
    this.validateStringLength(date.toString(), 3, 100, 'Date');
    this.contract_number = contract_number;
    this.client_name = client_name;
    this.date = date;
    this.cash = cash;
    this.parts = parts;
  }

  private validateIsNotEmpty(value: string, fieldName: string): void {
    if (value === null || value === undefined || value.trim() === '') {
      throw new Error(`${fieldName} cannot be empty`);
    }
  }

  private validateStringLength(value: string, min: number, max: number, fieldName: string): void {
    if (value.length < min || value.length > max) {
      throw new Error(`${fieldName} must be between ${min} and ${max} characters long`);
    }
  }
}
