export * from './abstracts';

export * from './donation.entity';
export * from './user.entity';
export * from './user-wallet.entity';
export * from './user-donation.entity';
export * from './user-follow-count.entity';
export * from './oauth.entity';
export * from './studio.entity';
export * from './studio-play-setting.entity';
export * from './studio-donation-setting.entity';
export * from './follow.entity';
export * from './forbidden-word.entity';
export * from './alert-sound.entity';
export * from './alert-widget.entity';
export * from './tts-voice.entity';
export * from './tts-voice-image.entity';
export * from './tts-voice-sample-sound.entity';
export * from './block.entity';

import { AlertSoundEntity } from './alert-sound.entity';
import { AlertWidgetEntity } from './alert-widget.entity';
import { BlockEntity } from './block.entity';
import { DonationEntity } from './donation.entity';
import { FollowEntity } from './follow.entity';
import { ForbiddenWordEntity } from './forbidden-word.entity';
import { OAuthEntity } from './oauth.entity';
import { StudioDonationSettingEntity } from './studio-donation-setting.entity';
import { StudioPlaySettingEntity } from './studio-play-setting.entity';
import { StudioEntity } from './studio.entity';
import { TtsVoiceImageEntity } from './tts-voice-image.entity';
import { TtsVoiceSampleSoundEntity } from './tts-voice-sample-sound.entity';
import { TtsVoiceEntity } from './tts-voice.entity';
import { UserDonationsEntity } from './user-donation.entity';
import { UserFollowCountEntity } from './user-follow-count.entity';
import { UserWalletEntity } from './user-wallet.entity';
import { UserEntity } from './user.entity';

export const entities = [
  UserEntity,
  UserWalletEntity,
  UserFollowCountEntity,
  UserDonationsEntity,
  DonationEntity,
  BlockEntity,
  OAuthEntity,
  StudioEntity,
  StudioPlaySettingEntity,
  StudioDonationSettingEntity,
  FollowEntity,
  ForbiddenWordEntity,
  AlertSoundEntity,
  AlertWidgetEntity,
  TtsVoiceEntity,
  TtsVoiceImageEntity,
  TtsVoiceSampleSoundEntity,
];
