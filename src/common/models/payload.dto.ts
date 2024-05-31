import { ApiProperty } from '@nestjs/swagger';

export class PayloadDTO {
  @ApiProperty({
    description: 'user id',
    example: '102051010',
  })
  id: string;
  @ApiProperty({
    description: 'first name',
    example: '김',
  })
  first_name: string;
  @ApiProperty({
    description: 'last name',
    example: '상현',
  })
  last_name: string;
  @ApiProperty({
    description: 'email',
    example: 'asd@asd.com',
  })
  email: string;
  @ApiProperty({
    description: 'image url',
    example: 'https://localghoasdpwfqf.qwcowegoqwf.qwcqwfgqwf',
  })
  picture: string;
}
