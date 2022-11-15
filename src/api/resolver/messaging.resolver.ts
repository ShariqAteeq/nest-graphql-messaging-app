import { GqlAuthGuard } from './../../auth/auth.guard';
import { SendMessageInput } from './../dto/messaging';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MessagingService } from '../service/messaging.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class MessagingResolver {
  constructor(private msgService: MessagingService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async sendMessage(
    @Args('input') input: SendMessageInput,
    @CurrentUser() user,
  ) {
    console.log('user', user);
    return 'Hi';
  }
}
