import { GqlAuthGuard } from './../../auth/auth.guard';
import { SendMessageInput } from './../dto/messaging';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { MessagingService } from '../service/messaging.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UseGuards, Inject } from '@nestjs/common';
import { Conversation } from '../entities/conversation';
import { UserService } from '../service/user.service';
import { PubSub } from 'graphql-subscriptions';
import { User } from '../entities/user';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSub,
    private msgService: MessagingService,
    private userService: UserService,
  ) {}

  // ====== Queries =======

  // ======== Get My Conversations =========
  @UseGuards(GqlAuthGuard)
  @Query(() => [Conversation])
  async getMyConversations(@CurrentUser() user): Promise<Conversation[]> {
    return await this.msgService.getMyConversations(user);
  }

  // ====== Mutations =======

  // ======== Send Message =========
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Conversation)
  async sendMessage(
    @Args('input') input: SendMessageInput,
    @CurrentUser() user,
  ): Promise<Conversation> {
    const conversation = await this.msgService.sendMessage(input, user);
    this.pubSub.publish('messageSent', { messageSent: conversation });
    return conversation;
  }

  // ====== Subscription ==========

  @Subscription(() => Conversation, {
    name: 'messageSent',
    filter(payload, variables) {
      console.log('payload', payload);
      console.log('payload', variables);
      return payload['messageSent']['otherUserId'] === variables['userId'];
    },
  })
  messageSent(@Args('userId') userId: string) {
    return this.pubSub.asyncIterator('messageSent');
  }

  // ====== Resolvers =======

  @ResolveField()
  async otherUser(@Parent() convo: Conversation): Promise<User> {
    return await this.userService.getUser(convo.otherUserId);
  }
}
