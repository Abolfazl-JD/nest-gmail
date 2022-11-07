import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UpdateUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      const gqlReq = GqlExecutionContext.create(context)
      const { updateUserInput } = gqlReq.getArgs()
      const { userId } = gqlReq.getContext().req.session

      return userId ? userId === updateUserInput.id : false
  }
}