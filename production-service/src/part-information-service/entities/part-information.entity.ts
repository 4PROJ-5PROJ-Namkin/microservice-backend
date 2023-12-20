import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { SupplyChain } from '../../supply-chain-service/entities/supply-chain.entity';
import { Material } from 'src/material-service/entities/material.entity';

@Entity()
export class PartInformation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'decimal',
        default: 0
    })
    defaultPrice: number;

    @Column({ nullable: false })
    timeToProduce: number;

    @OneToMany(() => SupplyChain, supplyChain => supplyChain.part, { cascade: true })
    supplyChain: SupplyChain;

    @ManyToMany(() => Material, material => material.partInformations)
    materials: Material[];
}
