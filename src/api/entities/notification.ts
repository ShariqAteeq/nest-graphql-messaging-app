import { User } from './user';
import { NotificationType } from './../../helpers/constant';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { INotification } from '../dto/notification';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  implements: () => [INotification],
})
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

  @Field(() => User, { nullable: true })
  fromUser: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  fromUserId: string;

  @Field(() => User, { nullable: true })
  otherUser: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  otherUserId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  conversationId: string;

  @Column()
  @Field()
  createdAt: Date;
}
