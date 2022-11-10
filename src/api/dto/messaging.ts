import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendMessage {
  @Field()
  otherUserId: number;

  @Field()
  message: string;
}
