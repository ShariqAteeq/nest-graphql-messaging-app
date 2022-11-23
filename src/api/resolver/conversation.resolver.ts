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
import { UseGuards } from '@nestjs/common';
import { Conversation } from '../entities/conversation';
import { UserService } from '../service/user.service';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
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
    pubSub.publish('messageSent', { messageSent: conversation });
    return conversation;
  }

  // ====== Subscription ==========

  @Subscription(() => Conversation, {
    name: 'messageSent',
    // filter(payload, variables) {
    //   return payload['my']['postId'] === variables['postId'];
    // },
  })
  // messageSent(@Args('postId') postId: number) {
  messageSent() {
    return pubSub.asyncIterator('messageSent');
  }

  // ====== Resolvers =======

  @ResolveField()
  // async fromMessage(@Parent() message: Message ): Promise<User> {
  async otherUser(@Parent() convo: Conversation) {
    return await this.userService.getUser(convo.otherUserId);
  }
}
