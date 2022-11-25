import { NotificationType } from './../../helpers/constant';
import { INotification } from '../dto/notification';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Entity('Notification')
export class Notification implements INotification {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => ID)
  userId: string;

  @Column()
  @Field(() => NotificationType)
  type: NotificationType;

  @Column()
  @Field()
  read: Boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  message: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  fromUserId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  otherUserId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  conversationId: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field({ nullable: true })
  createdAt: Date;

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
  logUpdatedAt: Date;
}
