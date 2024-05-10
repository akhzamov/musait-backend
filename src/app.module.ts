import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from '@app/routes/application/application.module';
import { UserModule } from '@app/routes/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/routes/user/guards/roles.guard';
import { AuthMiddleware } from '@app/routes/user/middlewares/auth.middleware';
import { AnswerModule } from '@app/routes/answer/answer.module';
import typeorm from '@app/config/typeorm';
import { LeadModule } from './routes/lead/lead.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ApplicationModule,
    UserModule,
    AnswerModule,
    LeadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
