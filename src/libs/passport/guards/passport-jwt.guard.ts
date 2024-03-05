import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { SKIP_PASSPORT_JWT_GUARD_METADATA_KEY } from '../decorators';
import { PassportJwtException } from '../exceptions';

@Injectable()
export class PassportJwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isSkip = this.reflector.getAllAndOverride(SKIP_PASSPORT_JWT_GUARD_METADATA_KEY, [context.getClass(), context.getHandler()]);

    if (isSkip) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<TUser = any>(error: Error, result: any): TUser {
    if (error || !result) {
      throw new PassportJwtException(error);
    }

    return result;
  }
}