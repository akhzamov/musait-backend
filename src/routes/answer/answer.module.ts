import { Module } from '@nestjs/common';
import { AnswerService } from '@app/routes/answer/answer.service';
import { AnswerController } from '@app/routes/answer/answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from '@app/routes/answer/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [],
})
export class AnswerModule {}
