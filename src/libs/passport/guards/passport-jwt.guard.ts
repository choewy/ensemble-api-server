import { ExecutionContext, FactoryProvider, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Observable } from 'rxjs';

import { SKIP_PASSPORT_JWT_GUARD_METADATA_KEY } from '../decorators';

@Injectable()
export class PassportJwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  static mock(): FactoryProvider {
    return {
      provide: PassportJwtGuard,
      useFactory() {
        const passportJwtGuard = new PassportJwtGuard(new Reflector());
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(passportJwtGuard));
        const mock = {};

        for (const method of methods) {
          mock[method] = () => null;
        }

        return mock as PassportJwtGuard;
      },
    };
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isSkip = this.reflector.getAllAndOverride(SKIP_PASSPORT_JWT_GUARD_METADATA_KEY, [context.getClass(), context.getHandler()]);

    if (isSkip) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<TUser = any>(e: Error, payload: any, info: Error): TUser {
    let error = e ?? info;

    if (error || payload == null) {
      if (error?.name !== TokenExpiredError.name) {
        error = new JsonWebTokenError(error.message);
      }

      throw new UnauthorizedException(error);
    }

    return payload ?? null;
  }
}
