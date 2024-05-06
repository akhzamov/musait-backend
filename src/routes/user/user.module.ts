import { UserEntity } from '@app/routes/user/user.entity';
import { Module } from '@nestjs/common';
import { UserService } from '@app/routes/user/user.service';
import { UserController } from '@app/routes/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '@app/routes/user/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
