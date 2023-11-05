import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Material } from './material.entity';

@Entity()
export class MaterialPrice {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => Material, material => material.prices)
    material: Material;

    @Column({ default: 0 })
    price: number;

    @Column({
        type: 'varchar',
        transformer: {
            to: (value: Date) => value ? `${(value.getMonth() + 1).toString().padStart(2, '0')}-${value.getDate().toString().padStart(2, '0')}-${value.getFullYear()}` : null,
            from: (value: string) => value ? new Date(value) : null,
        },
    })
    date: string;
}
