import { ValueTransformer } from 'typeorm';

export class UnixTimestampTransformer implements ValueTransformer {
  to(value: Date): number {
    return Math.floor(value.getTime() / 1000);
  }

  from(value: number): Date {
    return new Date(value * 1000);
  }
}