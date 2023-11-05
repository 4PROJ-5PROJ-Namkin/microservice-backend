import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SupplyChain } from '../../../supply-chain-service/entities/supply-chain.entity';

@Entity()
export class PartInformation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ default: 0 })
    defaultPrice: number;

    @Column({ nullable: false })
    timeToProduce: number;

    @OneToMany(() => SupplyChain, supplyChain => supplyChain.part)
    supplyChain: SupplyChain;
}
