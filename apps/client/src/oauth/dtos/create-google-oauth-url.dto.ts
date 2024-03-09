import { GoogleOAuthConfigReturnType } from '@libs/configs';
import QueryString from 'qs';

import { CreateOAuthUrlDto } from './create-oauth-url.dto';
import { OAuthStateDto } from './oauth-state.dto';

export class CreateGoogleOAuthUrlDto implements CreateOAuthUrlDto {
  url = 'https://accounts.google.com/o/oauth2/v2/auth';

  constructor(googleOAuthConfig: GoogleOAuthConfigReturnType, redirectUrl: string, userId?: number) {
    this.url += `?${QueryString.stringify({
      response_type: 'code',
      client_id: googleOAuthConfig.clientId,
      redirect_uri: googleOAuthConfig.redirectUri,
      state: new OAuthStateDto(redirectUrl, userId).encode(),
      scope: 'email profile',
    })}`;
  }
}
