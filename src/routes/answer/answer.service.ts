import { Injectable } from '@nestjs/common';
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
      newAnswer.answers = [];
    }

    return await this.answerRepository.save(newAnswer);
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }

  buildAnswerResponse(answer: AnswerEntity): IAnswerResponse {
    return { answer };
  }
}
