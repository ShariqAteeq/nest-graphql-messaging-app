import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SConvo } from '../dto/notification';
import { User } from '../entities/user';
import { UserService } from '../service/user.service';

@Resolver(() => SConvo)
export class SConvoResolver {
  constructor(private userService: UserService) {}

  @ResolveField()
  async otherUser(@Parent() sconvo: SConvo): Promise<User> {
    return await this.userService.getUser(sconvo.otherUserId);
  }
}
