import { AuthService } from '@apps/client/auth';
import { GOOGLE_OAUTH_CONFIG, KAKAO_OAUTH_CONFIG, NAVER_OAUTH_CONFIG } from '@libs/configs';
import { OAuthEntity, OAuthPlatform, OAuthRepository, UserEntity, UserRepository } from '@libs/entity';
import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import QueryString from 'qs';
import { lastValueFrom } from 'rxjs';
import { DeepPartial } from 'typeorm';

import { CreateOAuthUrlCommand, SignFromGoogleCommand, SignFromKakaoCommand, SignFromNaverCommand } from '../commands';
import {
  CreateGoogleOAuthUrlDto,
  CreateKakaoOAuthUrlDto,
  CreateNaverOAuthUrlDto,
  GetGoogleOAuthProfileDto,
  GetGoogleOAuthTokensDto,
  OAuthStateDto,
} from '../dtos';
import { GoogleOAuthProfile, GoogleOAuthTokens } from '../interfaces';

@Injectable()
export class OAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private readonly oauthRepository: OAuthRepository,
  ) {}

  redirect(res: Response, platform: OAuthPlatform, user: UserEntity, redirectUrl: string) {
    res.redirect(HttpStatus.FOUND, `${redirectUrl}?${QueryString.stringify(this.authService.createTokens(platform, user.id))}`);
  }

  createOAuthUrl(command: CreateOAuthUrlCommand, userId?: number) {
    switch (command.platform) {
      case OAuthPlatform.Google:
        return new CreateGoogleOAuthUrlDto(this.configService.get(GOOGLE_OAUTH_CONFIG), command.redirectUrl, userId);

      case OAuthPlatform.Kakao:
        return new CreateKakaoOAuthUrlDto(this.configService.get(KAKAO_OAUTH_CONFIG), command.redirectUrl, userId);

      case OAuthPlatform.Naver:
        return new CreateNaverOAuthUrlDto(this.configService.get(NAVER_OAUTH_CONFIG), command.redirectUrl, userId);
    }
  }

  async updateOAuth(deepPartial: DeepPartial<OAuthEntity>) {
    const oauth = await this.oauthRepository.findOne({
      relations: { user: true },
      where: { platform: deepPartial.platform, oauthId: deepPartial.oauthId },
    });

    if (oauth) {
      await this.oauthRepository.update(oauth.id, deepPartial);
    }

    return oauth?.user ?? null;
  }

  async inserOAuth(userId: number, deepPartial: DeepPartial<OAuthEntity>) {
    const user = await this.userRepository.findOneBy({ id: userId });
    await this.oauthRepository.insert({ ...deepPartial, user });
    return user;
  }

  async createUser(deepPartial: DeepPartial<OAuthEntity>) {
    const user = this.userRepository.create({
      nickname: deepPartial.nickname,
      profileImageUrl: deepPartial.profileImageUrl,
      oauths: [deepPartial],
      studio: { studioSetting: {}, alertWidget: {}, messageWidget: {} },
    });
    await user.save();
    return user;
  }

  async getGoogleOAuthTokens(code: string) {
    const dto = new GetGoogleOAuthTokensDto(code, this.configService.get(GOOGLE_OAUTH_CONFIG));
    const res = await lastValueFrom(this.httpService.post<GoogleOAuthTokens>(dto.url, dto.body)).catch((e) => {
      throw new UnauthorizedException(e?.response?.data ?? e);
    });

    return res.data;
  }

  async getGoogleOAuthProfile(accessToken: string) {
    const dto = new GetGoogleOAuthProfileDto(accessToken);
    const res = await lastValueFrom(this.httpService.get<GoogleOAuthProfile>(dto.url, { headers: dto.headers })).catch((e) => {
      throw new UnauthorizedException(e);
    });

    return res.data;
  }

  async signFromGoogle(res: Response, command: SignFromGoogleCommand) {
    const platform = OAuthPlatform.Google;
    const state = OAuthStateDto.decode(command.state);
    const oauthTokens = await this.getGoogleOAuthTokens(command.code);
    const oauthProfile = await this.getGoogleOAuthProfile(oauthTokens.access_token);
    const deepPartial: DeepPartial<OAuthEntity> = {
      platform,
      oauthId: oauthProfile.id,
      nickname: oauthProfile.name,
      email: oauthProfile.email,
      profileImageUrl: oauthProfile.picture,
    };

    let user = await this.updateOAuth(deepPartial);
    if (user === null) {
      if (typeof state.userId === 'number') {
        user = await this.inserOAuth(state.userId, deepPartial);
      } else {
        user = await this.createUser(deepPartial);
      }
    }

    return this.redirect(res, platform, user, state.redirectUrl);
  }

  async signFromKakao(res: Response, command: SignFromKakaoCommand) {
    const platform = OAuthPlatform.Kakao;
    const state = OAuthStateDto.decode(command.state);

    return;
  }

  async signFromNaver(res: Response, command: SignFromNaverCommand) {
    const platform = OAuthPlatform.Naver;
    const state = OAuthStateDto.decode(command.state);

    return;
  }
}
