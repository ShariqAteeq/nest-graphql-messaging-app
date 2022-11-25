import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { SubsciptionEvent } from 'src/helpers/constant';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from '../dto/notification';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}

  @UseGuards(GqlAuthGuard)
  @Subscription(() => Notification, {
    name: 'onNotified',
    filter(payload, variables) {
      console.log('payload', payload);
      console.log('payload', variables);
      return payload['onNotified']['otherUserId'] === variables['userId'];
    },
  })
  onNotified(@Args('userId') userId: string) {
    return this.pubSub.asyncIterator(SubsciptionEvent.CONVO);
  }
}
