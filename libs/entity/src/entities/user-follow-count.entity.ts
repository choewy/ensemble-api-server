import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'user_follow_count' })
export class UserFollowCountEntity extends BaseEntity {
  @PrimaryColumn({ type: 'int', unsigned: true, primary: false })
  readonly userId: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  followings: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  followers: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => UserEntity, (e) => e.userFollowCount, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;
}