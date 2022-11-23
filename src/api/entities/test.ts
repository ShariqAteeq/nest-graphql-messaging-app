import { TestUnion } from './../dto/test';
import { Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Test')
export class Test {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field()
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  // @Column({nul})
  // @Field(() => TestUnion)
  // type: TestUnion
}
