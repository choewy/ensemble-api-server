import { JwtConfigService } from '@libs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportJwtPayload } from '../implements';

@Injectable()
export class PassportJwtStrategy extends PassportStrategy(Strategy) {
  constructor(jwtConfigService: JwtConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.getJwtModuleOptions().secret,
    });
  }

  async validate(payload: JwtPayload): Promise<PassportJwtPayload> {
    return new PassportJwtPayload(payload);
  }
}
