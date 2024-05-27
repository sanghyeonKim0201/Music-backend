import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    description: 'google ID',
    example: '10201054010',
  })
  readonly id: string;

  @ApiProperty({
    description: 'google Email',
    example: 'text@text.com',
  })
  readonly email: string;

  @ApiProperty({
    description: '성',
    example: '김',
  })
  readonly first_name: string;

  @ApiProperty({
    description: '이름',
    example: '상현',
  })
  readonly last_name: string;

  @ApiProperty({ description: 'url', example: 'https://~~~~~~~~~~~~' })
  readonly picture: string;
}
