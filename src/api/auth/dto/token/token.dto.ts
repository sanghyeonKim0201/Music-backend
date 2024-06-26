import { ApiProperty } from '@nestjs/swagger';

export class TokenDTO {
  @ApiProperty({ description: 'id', example: '1' })
  readonly id: number;
  @ApiProperty({ description: 'google id', example: '1020105010212005' })
  readonly user_id: string;

  @ApiProperty({
    description: 'refresh token',
    example: 'WDQWQWFFRGRG235234ASFGEWRG=',
  })
  readonly refresh_token: string;
  readonly access_token: string;
}
