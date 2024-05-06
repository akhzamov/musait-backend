import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly role: string;

  @ApiProperty()
  readonly image: string;
}
