import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Res,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { JwtAuthGuard } from './guards/auth.guard';
import { Response } from 'express';

@ApiTags('users') // Add a tag to the controller
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Res() res: Response) {
    const token = await this.authService.signup(body.email, body.password);
    res.status(HttpStatus.OK).json(token);
    return token;
  }

  @ApiOperation({ summary: 'Sign in as a user' })
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Res() res: Response) {
    const token = await this.authService.signin(body.email, body.password);
    res.status(HttpStatus.OK).json(token);
    return token;
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findUser(@Param('id') id: string, @Request() req): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @Get('/')
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiBearerAuth()
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}
