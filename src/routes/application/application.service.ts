import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ApplicationEntity } from '@app/routes/application/application.entity';
import { IApplicationResponse } from '@app/routes/application/types/applicationResponse.interface';
import { CreateApplicationDto } from '@app/routes/application/dto/createApplication.dto';
import { IApplicationsResponse } from '@app/routes/application/types/applicationsResponse.interface';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
    private dataSource: DataSource,
  ) {}

  async createApplication(
    createApplicationDto: CreateApplicationDto,
  ): Promise<ApplicationEntity> {
    const newApplication = new ApplicationEntity();
    Object.assign(newApplication, createApplicationDto);

    if (!newApplication.tagList) {
      newApplication.tagList = [];
    }

    return await this.applicationRepository.save(newApplication);
  }

  async getAllApplications(query: any): Promise<IApplicationsResponse> {
    const queryBuilder = this.dataSource
      .getRepository(ApplicationEntity)
      .createQueryBuilder('applications');

    queryBuilder.orderBy('applications.createdAt', 'DESC');

    const count = await queryBuilder.getCount();

    if (query.tag) {
      queryBuilder.andWhere('applications.tagList LIKE :tag', {
        tag: `%${query.tag}%`,
      });
    }

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const applications = await queryBuilder.getMany();

    return { applications, count };
  }

  async getApplicationById(id: number): Promise<ApplicationEntity> {
    return await this.applicationRepository.findOne({
      where: { id },
    });
  }

  async deleteApplicationByID(id) {
    const application = await this.getApplicationById(id);

    return await this.applicationRepository.delete({ id });
  }

  buildApplicationResponse(
    application: ApplicationEntity,
  ): IApplicationResponse {
    return { application };
  }
}
