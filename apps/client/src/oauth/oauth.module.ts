import { UserRepository, OAuthRepository } from '@libs/entity';
import { TypeOrmLibsModule } from '@libs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { ClientJwtService } from '../jwt';

@Module({
  imports: [HttpModule, TypeOrmLibsModule.forFeature([UserRepository, OAuthRepository])],
  controllers: [OAuthController],
  providers: [ClientJwtService, OAuthService],
})
export class OAuthModule {}
