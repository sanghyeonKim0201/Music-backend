import { ApiProperty } from '@nestjs/swagger';

export class UpdateTokenDTO {
  @ApiProperty({ description: 'google id', example: '1020105010212005' })
  readonly user_id: string;

  @ApiProperty({
    description: 'refresh token',
    example: 'WDQWQWFFRGRG235234ASFGEWRG=',
  })
  readonly refresh_token: string;
}
