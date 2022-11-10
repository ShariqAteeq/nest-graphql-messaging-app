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
    TypeOrmModule.forFeature([SMSToken]),
  ],
  providers: [UserResolver, UserService, HelperService],
  exports: [],
})
export class ApiModule {}
