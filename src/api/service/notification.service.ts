import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationType, SubsciptionEvent } from 'src/helpers/constant';
import { Repository } from 'typeorm';
import { NotifyConvo, SConvo } from '../dto/notification';
import { Notification } from '../entities/notification';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification) private notifRepo: Repository<Notification>,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  async sendNotifToConvo(payload: NotifyConvo): Promise<SConvo> {
    const { userId, message, conversationId, otherUserId } = payload;
    const notifyObj = await this.notifRepo.create({
      userId,
      message,
      otherUserId,
      conversationId,
      read: false,
      type: NotificationType.SCONVO,
    });
    const res = await this.notifRepo.save(notifyObj);
    this.pubSub.publish(SubsciptionEvent.CONVO, { onNotified: res });
    return res;
  }
}
