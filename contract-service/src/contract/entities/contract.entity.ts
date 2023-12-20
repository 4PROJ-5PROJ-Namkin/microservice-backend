import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Contract {
  @Field(() => String, { description: 'UUID field' })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { description: 'contract_number field' })
  @Column({ unique: true, nullable: false })
  contract_number: string;

  @Field(() => Number, { description: 'client_name field' })
  @Column({ unique: false, nullable: false })
  client_name: string;

  @Field(() => Date, { description: 'date field' })
  @Column({ unique: false, nullable: false })
  date: Date;

}
