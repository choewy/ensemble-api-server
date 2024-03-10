import { UserRepository } from '@libs/entity';
import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientJwtService } from '../jwt';

@Module({
  imports: [TypeOrmLibsModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService, ClientJwtService],
  exports: [AuthService],
})
export class AuthModule {}
