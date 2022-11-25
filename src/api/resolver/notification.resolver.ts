import { NotificationService } from './../service/notification.service';
import { NotificationData } from './../dto/notification';
import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { UseGuards, Inject, Query } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { SubsciptionEvent } from 'src/helpers/constant';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from 'src/decorators/user.decorator';

@Resolver(() => NotificationData)
export class NotificationResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSub,
    private notifService: NotificationService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Subscription(() => NotificationData, {
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

  //  // ======== Get My Conversations =========
  //  @UseGuards(GqlAuthGuard)
  //  @Query(() => [NotificationData])
  //  async getMyConversations(@CurrentUser() user): Promise<typeof NotificationData[]> {
  //    return await this.notifService.listNotifications(user);
  //  }
}
