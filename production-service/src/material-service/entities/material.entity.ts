import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { MaterialPrice } from './material-price.entity';
import { PartInformation } from '../../part-information-service/entities/part-information.entity';

@Entity()
export class Material {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @OneToMany(() => MaterialPrice, materialPrice => materialPrice.material)
    prices: MaterialPrice[];

    @ManyToMany(() => PartInformation, partInformation => partInformation.materials)
    @JoinTable({ name: 'material_part_information' })
    partInformations: PartInformation[];
}
