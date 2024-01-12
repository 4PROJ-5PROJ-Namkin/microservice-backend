import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PartInformation } from '../../part-information-service/entities/part-information.entity';
import { Machine } from './machine.entity';
import { UnixTimestampTransformer } from 'src/utils/timestamp';

@Entity()
export class SupplyChain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Machine, machine => machine.supplyChain)
  @JoinColumn({ name: "machineId" })
  machine: Machine;

  @Column()
  machineId: number;

  @Column({
    type: 'bigint',
    transformer: new UnixTimestampTransformer(),
  })
  timeOfProduction: Date;

  @ManyToOne(() => PartInformation)
  @JoinColumn({ name: "partId" })
  part: PartInformation;

  @Column()
  partId: number;

  @Column({ unique: false, nullable: false })
  order: number;

  @Column({ unique: false, nullable: true })
  var1: number;

  @Column({ unique: false, nullable: true })
  var2: string;

  @Column({ unique: false, nullable: true })
  var3: string;

  @Column({ unique: false, nullable: true })
  var4: number;

  @Column({ nullable: false })
  var5: boolean;

}
