import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @ApiProperty()
  age: string;

  @ApiProperty()
  company: string;

  @IsNotEmpty()
  @ApiProperty()
  answers: object[];
}
