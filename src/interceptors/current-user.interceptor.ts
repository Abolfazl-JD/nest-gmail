import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from './../users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService : UsersService){}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const { req } = GqlExecutionContext.create(context).getContext()
      const { userId } = req.session || {}

      if (userId) {
          const user = await this.usersService.getSingleUserById(userId)
          req.currentUser = user
      }

      return next.handle()
  }
}