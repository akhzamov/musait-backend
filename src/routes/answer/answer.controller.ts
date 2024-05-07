import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnswerService } from '@app/routes/answer/answer.service';
import { CreateAnswerDto } from '@app/routes/answer/dto/create-answer.dto';
import { IAnswerResponse } from '@app/routes/answer/types/answerResponse.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Answers')
@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createAnswerDto: CreateAnswerDto,
  ): Promise<IAnswerResponse> {
    const newAnswer = await this.answerService.create(createAnswerDto);
    return this.answerService.buildAnswerResponse(newAnswer);
  }
}
