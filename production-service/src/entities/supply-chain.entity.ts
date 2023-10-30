import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PartInformation } from './part-information.entity';

@Entity()
export class SupplyChain {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  machineId: number;

  @Column({ type: 'timestamp' })
  timeOfProduction: Date;

  @Column()
  part_id: number;

  @Column()
  order: string;

  @Column()
  var1: string;

  @Column()
  var2: string;

  @Column()
  var3: string;

  @Column()
  var4: string;

  @Column({ nullable: false })
  var5: boolean;

  @OneToMany(() => PartInformation, partInformation => partInformation.supplyChain)
  parts: PartInformation[];
}
