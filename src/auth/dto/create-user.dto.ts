import { ApiProperty } from '@nestjs/swagger';
import { user } from '@prisma/client';

export class CreateUserDTO {
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

  @ApiProperty()
  readonly first_name: string;

  @ApiProperty()
  readonly last_name: string;

  @ApiProperty()
  readonly picture?: string;

  constructor(user: user) {
    this.email = user.email;
    this.first_name = user.first_name;
    this.id = user.id;
    this.last_name = user.last_name;
    this.picture = user.picture;
  }
}
