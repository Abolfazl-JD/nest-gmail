import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { UpdateUserGuard } from './../guards/update-user.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Resolver(() => User)
@Serialize(UserDto)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput, @Context() ctx: any) {
    const user = await this.usersService.create(createUserInput);
    ctx.req.session.userId = user.id
    return user
  }

  @Mutation(() => User)
  async loginUser(@Args('loginUserInput') userInfo: LoginUserInput, @Context() ctx: any) {
    const user = await this.usersService.login(userInfo)
    ctx.req.session.userId = user.id
    return user
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(UpdateUserGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput, @Context() ctx: any) {
    return this.usersService.updateUser((ctx.req.session.userId) as number, updateUserInput);
  }
}
