import { MessagingService } from './service/messaging.service';
import { MessagingResolver } from './resolver/messaging.resolver';
import { Conversation } from './entities/conversation';
import { Message } from './entities/message';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SMSToken } from './entities/token';
import { User } from './entities/user';
import { UserResolver } from './resolver/user.resolver';
import { HelperService } from './service/helper.service';
import { UserService } from './service/user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Message]),
    TypeOrmModule.forFeature([Conversation]),
    TypeOrmModule.forFeature([SMSToken]),
  ],
  providers: [
    UserResolver,
    UserService,
    HelperService,
    MessagingResolver,
    MessagingService,
  ],
  exports: [],
})
export class ApiModule {}
