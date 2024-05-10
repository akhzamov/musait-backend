import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from '@app/routes/answer/dto/create-answer.dto';
import { AnswerEntity } from '@app/routes/answer/answer.entity';
import { IAnswerResponse } from '@app/routes/answer/types/answerResponse.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<AnswerEntity> {
    const newAnswer = new AnswerEntity();
    Object.assign(newAnswer, createAnswerDto);

    if (!newAnswer.answers) {
      throw new HttpException(
        'Answers array is missing',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!newAnswer.age) {
      newAnswer.age = '';
    }

    if (!newAnswer.company) {
      newAnswer.company = '';
    }

    return await this.answerRepository.save(newAnswer);
  }

  buildAnswerResponse(answer: AnswerEntity): IAnswerResponse {
    return { answer };
  }
}
