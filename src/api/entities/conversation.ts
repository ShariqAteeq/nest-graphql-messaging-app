import { User } from './user';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@ObjectType()
@Entity('Conversation')
export class Conversation {
  @PrimaryColumn()
  @Field()
  userId: string;

  @PrimaryColumn()
  @Field()
  otherUserId: string;

  @Column()
  @Field()
  conversationId: string;

  @Column()
  @Field()
  lastMessage: string;

  @ManyToOne(() => User, (use) => use.id)
  @Field(() => User)
  otherUser: User;

  @ManyToOne(() => User, (use) => use.id)
  @Field(() => User)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field({ nullable: true })
  logCreatedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field({ nullable: true })
  logUpdatedAt: Date;
}
