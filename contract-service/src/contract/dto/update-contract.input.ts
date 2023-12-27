export class UpdateContractsInput {
  id: string;
  contract_number: string;
  client_name: string;
  date: Date;
  cash : number[];
  parts : number[];

  constructor(id: string, contract_number: string, client_name: string, date: Date, cash : number[], parts : number[]) {
    this.validateIsNotEmpty(contract_number);
    this.validateIsNotEmpty(client_name);

    this.id = id;
    this.contract_number = contract_number;
    this.client_name = client_name;
    this.date = date;
    this.cash = cash;
    this.parts = parts;

  }

  private validateIsNotEmpty(value: string): void {
    if (value === null || value === undefined || value.trim() === '') {
      throw new Error('Value cannot be empty');
    }
  }
}
