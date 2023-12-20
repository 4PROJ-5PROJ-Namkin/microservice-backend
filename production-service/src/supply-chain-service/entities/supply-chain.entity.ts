import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PartInformation } from '../../part-information-service/entities/part-information.entity';
import { Machine } from './machine.entity';
import { UnixTimestampTransformer } from 'src/utils/timestamp';

@Entity()
export class SupplyChain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Machine, machine => machine.supplyChain, { cascade: true })
  machine: Machine[];

  @Column({
    type: 'bigint',
    transformer: new UnixTimestampTransformer(),
  })
  timeOfProduction: Date;

  @ManyToOne(() => PartInformation, partInformation => partInformation.supplyChain)
  part: PartInformation[];

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
