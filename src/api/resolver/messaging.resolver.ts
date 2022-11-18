import { Message } from './../entities/message';
import { GqlAuthGuard } from './../../auth/auth.guard';
import { SendMessageInput, GetMessagesInput } from './../dto/messaging';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagingService } from '../service/messaging.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { Conversation } from '../entities/conversation';

@Resolver()
export class MessagingResolver {
  constructor(private msgService: MessagingService) {}

  // ======== Send Message =========
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Conversation)
  async sendMessage(
    @Args('input') input: SendMessageInput,
    @CurrentUser() user,
  ): Promise<Conversation> {
    return await this.msgService.sendMessage(input, user);
  }

  // ======== Get My Conversations =========
  @UseGuards(GqlAuthGuard)
  @Query(() => [Conversation])
  async getMyConversations(@CurrentUser() user): Promise<Conversation[]> {
    return await this.msgService.getMyConversations(user);
  }

  // ======== Get Messages =========
  @UseGuards(GqlAuthGuard)
  @Query(() => [Message])
  async getMessages(
    @Args('input') input: GetMessagesInput,
    @CurrentUser() user,
  ): Promise<Message[]> {
    return await this.msgService.getMessages(input, user);
  }
}
