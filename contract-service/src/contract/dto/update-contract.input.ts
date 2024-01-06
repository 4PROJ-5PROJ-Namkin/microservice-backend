export class UpdateContractsInput {
  client_name: string;
  date: Date;
  cash : number[];
  parts : number[];

  constructor( client_name: string, date: Date, cash : number[], parts : number[]) {
    this.validateIsNotEmpty(client_name);

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
