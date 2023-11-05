import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PartInformation } from '../../src/part-information-service/entities/part-information.entity';
import { Machine } from './machine.entity';

@Entity()
export class SupplyChain {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Machine, machine => machine.supplyChain)
  machine: Machine[];

  @Column({ type: 'timestamp' })
  timeOfProduction: Date;

  @ManyToOne(() => PartInformation, partInformation => partInformation.supplyChain)
  part: PartInformation[];

  @Column({ unique: true, nullable: false })
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

}
