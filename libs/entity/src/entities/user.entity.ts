import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FollowEntity } from './follow.entity';
import { OAuthEntity } from './oauth.entity';
import { StudioEntity } from './studio.entity';
import { UserFollowCountEntity } from './user-follow-count.entity';
import { UserWalletEntity } from './user-wallet.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, default: null })
  nickname: string | null;

  @Column({ type: 'varchar', length: 1024, default: null })
  profileImageUrl: string | null;

  @OneToMany(() => OAuthEntity, (e) => e.user, { cascade: true })
  @JoinTable()
  oauths: OAuthEntity[];

  @OneToOne(() => UserWalletEntity, (e) => e.user, { cascade: true })
  @JoinTable()
  userWallet: UserWalletEntity;

  @OneToOne(() => UserFollowCountEntity, (e) => e.user, { cascade: true })
  @JoinTable()
  userFollowCount: UserFollowCountEntity;

  @OneToOne(() => StudioEntity, (e) => e.user, { cascade: true })
  @JoinTable()
  studio: StudioEntity;

  @OneToMany(() => FollowEntity, (e) => e.from, { cascade: true })
  @JoinTable()
  followings: FollowEntity[];

  @OneToMany(() => FollowEntity, (e) => e.to, { cascade: true })
  @JoinTable()
  followers: FollowEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updatedAt: Date;

  @JoinTable()
  followed: FollowEntity | null;
}
