export class UUID {
  id: string;

  constructor(id: string) {
    this.validateIsNotEmpty(id);
    this.id = id;
  }

  private validateIsNotEmpty(value: string): void {
    if (value === null || value === undefined || value.trim() === '') {
      throw new Error('ID cannot be empty');
    }
  }

}
