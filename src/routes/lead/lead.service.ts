import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLeadDto } from '@app/routes/lead/dto/create-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadEntity } from '@app/routes/lead/lead.entity';
import { ILeadResponse } from './types/leadResponse.interface';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(LeadEntity)
    private readonly answerRepository: Repository<LeadEntity>,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<LeadEntity> {
    const newAnswer = new LeadEntity();
    Object.assign(newAnswer, createLeadDto);

    return await this.answerRepository.save(newAnswer);
  }

  buildLeadResponse(lead: LeadEntity): ILeadResponse {
    return { lead };
  }
}
