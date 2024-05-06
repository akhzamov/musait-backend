import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from '@app/routes/application/application.entity';
import { ApplicationController } from '@app/routes/application/application.controller';
import { ApplicationService } from '@app/routes/application/application.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [],
})
export class ApplicationModule {}
