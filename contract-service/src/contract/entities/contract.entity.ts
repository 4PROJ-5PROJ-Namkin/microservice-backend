import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  contract_number: string;

  @Column({ unique: false, nullable: false })
  client_name: string;

  @Column({ unique: false, nullable: false })
  date: Date;

  @Column("float", { array: true, nullable: false })
  cash: number[];

  @Column("int", { array: true, nullable: false })
  parts: number[];
}
