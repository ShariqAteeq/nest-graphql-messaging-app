import { Message } from './../entities/message';
import { Conversation } from './../entities/conversation';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(Conversation) private convoRepo: Repository<Conversation>,
    @InjectRepository(Message) private msgRepo: Repository<Message>,
  ) {}

  async sendMessage() {}
}
