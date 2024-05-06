import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApplicationService } from '@app/routes/application/application.service';
import { CreateApplicationDto } from '@app/routes/application/dto/createApplication.dto';
import { IApplicationResponse } from '@app/routes/application/types/applicationResponse.interface';
import { IApplicationsResponse } from '@app/routes/application/types/applicationsResponse.interface';
import { Roles } from '@app/routes/user/decorators/roles.decorator';
import { Role } from '@app/routes/user/enums/roles.enum';
import { AuthGuard } from '@app/routes/user/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  async createApplication(
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<IApplicationResponse> {
    const newApplication =
      await this.applicationService.createApplication(createApplicationDto);
    return this.applicationService.buildApplicationResponse(newApplication);
  }

  @Get()
  async getAllApplications(
    @Query() query: any,
  ): Promise<IApplicationsResponse> {
    return await this.applicationService.getAllApplications(query);
  }

  @Get(':id')
  async getApplicationById(
    @Param('id') id: number,
  ): Promise<IApplicationResponse> {
    const application = await this.applicationService.getApplicationById(id);
    return this.applicationService.buildApplicationResponse(application);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  async deleteApplicationByID(@Param('id') id: number) {
    return this.applicationService.deleteApplicationByID(id);
  }
}
