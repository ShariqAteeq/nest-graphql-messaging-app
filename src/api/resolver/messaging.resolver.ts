import { Message } from './../entities/message';
import { GqlAuthGuard } from './../../auth/auth.guard';
import { SendMessageInput, GetMessagesInput } from './../dto/messaging';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagingService } from '../service/messaging.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { Conversation } from '../entities/conversation';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from '../entities/test';
import { Repository } from 'typeorm';

@Resolver()
export class MessagingResolver {
  constructor(
    private msgService: MessagingService,
    @InjectRepository(Test) private testRepo: Repository<Test>,
  ) {}

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

  // ======== Get Messages =========
  @Mutation(() => String)
  async test(
    @Args('id1') id1: string,
    @Args('id2') id2: string,
    @Args('name') name: string,
  ) {
    const res = await this.testRepo.save([{ id1, id2, name }]);
    console.log('res', res);
    return 'Pass';
  }
}
