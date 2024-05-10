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
import { LeadService } from '@app/routes/lead/lead.service';
import { ILeadResponse } from '@app/routes/lead/types/leadResponse.interface';
import { CreateLeadDto } from '@app/routes/lead/dto/create-lead.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Leads')
@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createLeadDto: CreateLeadDto): Promise<ILeadResponse> {
    const newAnswer = await this.leadService.create(createLeadDto);
    return this.leadService.buildLeadResponse(newAnswer);
  }
}
