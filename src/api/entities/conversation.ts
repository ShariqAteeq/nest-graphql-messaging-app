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
  id: string;

  @Column()
  @Field()
  lastMessage: string;

  @Column()
  @Field()
  otherUserId: number;

  @ManyToOne(() => User, (use) => use.id)
  @Field(() => User)
  otherUser: User;

  @Column()
  @Field()
  userId: number;

  @ManyToOne(() => User, (use) => use.id)
  @Field(() => User)
  user: User;

  @Column()
  @Field()
  msgUnreadCount: number;

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
