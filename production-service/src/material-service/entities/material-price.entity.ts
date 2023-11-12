import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Material } from './material.entity';
import { DateTransformer } from 'src/utils/date';

@Entity()
export class MaterialPrice {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => Material, material => material.prices)
    material: Material;

    @Column({
        type: 'decimal',
        default: 0
    })
    price: number;

    @Column({
        type: 'varchar',
        transformer: new DateTransformer(),
    })
    date: string;
}
