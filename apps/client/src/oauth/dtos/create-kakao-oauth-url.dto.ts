import { KakaoOAuthConfigReturnType } from '@libs/configs';
import QueryString from 'qs';

import { CreateOAuthUrlDto } from './create-oauth-url.dto';
import { OAuthStateDto } from './oauth-state.dto';

export class CreateKakaoOAuthUrlDto implements CreateOAuthUrlDto {
  url = 'https://kauth.kakao.com/oauth/authorize';

  constructor(kakaoOAuthConfig: KakaoOAuthConfigReturnType, redirectUrl: string, userId?: number) {
    this.url += `?${QueryString.stringify({
      response_type: 'code',
      client_id: kakaoOAuthConfig.clientId,
      redirect_uri: kakaoOAuthConfig.redirectUri,
      state: new OAuthStateDto(redirectUrl, userId).encode(),
    })}`;
  }
}
