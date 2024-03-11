import { FollowEntity } from '@libs/entity';
import { ApiResponseProperty } from '@nestjs/swagger';

import { FollowUserDto } from './folllow-user.dto';

export class GetFollowingsResultDto {
  @ApiResponseProperty({ type: Number })
  total: number;

  @ApiResponseProperty({ type: [FollowUserDto] })
  rows: FollowUserDto[];

  constructor(rows: FollowEntity[], total: number, userId: number | null) {
    this.total = total;
    this.rows = rows.map((row) => new FollowUserDto(row.to, row.fromId === userId, row.toId === userId));
  }
}
