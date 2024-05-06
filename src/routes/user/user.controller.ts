import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '@app/routes/user/user.service';
import { CreateUserDto } from '@app/routes/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/routes/user/dto/update-user.dto';
import { LoginUserDto } from '@app/routes/user/dto/login-user.dto';
import { IUserResponse } from '@app/routes/user/types/userResponse.interface';
import { User } from '@app/routes/user/decorators/user.decorator';
import { UserEntity } from '@app/routes/user/user.entity';
import { AuthGuard } from '@app/routes/user/guards/auth.guard';
import { Role } from '@app/routes/user/enums/roles.enum';
import { Roles } from '@app/routes/user/decorators/roles.decorator';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.SUPERADMIN)
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUserDto: LoginUserDto): Promise<IUserResponse> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<IUserResponse> {
    return this.userService.buildUserResponse(user);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUserResponse> {
    const newUser = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    return this.currentUser(newUser);
  }
}
