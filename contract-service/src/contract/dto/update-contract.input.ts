export class UpdateContractsInput {
  id: string;
  contract_number: string;
  client_name: string;
  date: Date;

  constructor(id: string, contract_number: string, client_name: string, date: Date) {
    this.validateIsUUID(id);
    this.validateIsNotEmpty(contract_number);
    this.validateIsNotEmpty(client_name);

    this.id = id;
    this.contract_number = contract_number;
    this.client_name = client_name;
    this.date = date;
  }

  private validateIsNotEmpty(value: string): void {
    if (value === null || value === undefined || value.trim() === '') {
      throw new Error('Value cannot be empty');
    }
  }

  private validateIsUUID(value: string): void {
    const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!regexExp.test(value)) {
      throw new Error('Invalid UUID');
    }
  }
}
