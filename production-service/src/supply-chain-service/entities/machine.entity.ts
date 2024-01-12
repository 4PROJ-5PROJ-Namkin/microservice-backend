import { Entity, PrimaryGeneratedColumn, Column, AfterLoad, OneToMany } from 'typeorm';
import { SupplyChain } from './supply-chain.entity';

@Entity()
export class Machine {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @OneToMany(() => SupplyChain, supplyChain => supplyChain.machine, { cascade: true })
    supplyChain: SupplyChain;
}