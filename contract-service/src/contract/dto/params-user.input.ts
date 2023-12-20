export class UUID {
  id: string;

  constructor(id: string) {
    this.validateIsNotEmpty(id);
    this.validateIsUUID(id);
    this.id = id;
  }

  private validateIsNotEmpty(value: string): void {
    if (value === null || value === undefined || value.trim() === '') {
      throw new Error('ID cannot be empty');
    }
  }

  private validateIsUUID(value: string): void {
    const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!regexExp.test(value)) {
      throw new Error('Invalid UUID');
    }
  }
}
