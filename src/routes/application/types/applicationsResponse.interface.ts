import { ApplicationEntity } from '@app/routes/application/application.entity';

export interface IApplicationsResponse {
  applications: ApplicationEntity[];
  count: number;
}
