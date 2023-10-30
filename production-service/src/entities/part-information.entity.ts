import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class PartInformation {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ default: 0 })
    defaultPrice: number;

    @Column({ nullable: false })
    timeToProduce: number;

}
