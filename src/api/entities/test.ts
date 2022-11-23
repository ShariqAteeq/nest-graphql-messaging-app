import { Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Test')
export class Test {
  @PrimaryColumn()
  @Field()
  id1: string;

  @PrimaryColumn()
  @Field()
  id2: string;

  @Column()
  name: string;
}
