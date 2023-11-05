import { Entity, PrimaryGeneratedColumn, Column, AfterLoad, OneToMany } from 'typeorm';
import { SupplyChain } from './supply-chain.entity';

@Entity()
export class Machine {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: 'text', readonly: true })
    name: string;

    @AfterLoad()
    setName() {
        this.name = `MACHINE_${this.id}`;
    }

    @OneToMany(() => SupplyChain, supplyChain => supplyChain.machine)
    supplyChain: SupplyChain;
}