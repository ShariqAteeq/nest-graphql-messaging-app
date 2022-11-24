import { NotificationType } from './../../helpers/constant';
import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class INotification {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => NotificationType)
  type: NotificationType;

  @Field()
  read: Boolean;

  @Field()
  createdAt: Date;
}
