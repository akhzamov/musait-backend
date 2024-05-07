import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email?: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly company: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly tagList?: string[];
}
