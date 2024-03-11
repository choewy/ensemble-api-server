import { UserRepository, OAuthRepository, StudioRepository } from '@libs/entity';
import { TypeOrmLibsModule } from '@libs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';

@Module({
  imports: [HttpModule, TypeOrmLibsModule.forFeature([UserRepository, OAuthRepository, StudioRepository])],
  controllers: [OAuthController],
  providers: [OAuthService],
})
export class OAuthModule {}
