import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users') // Add a tag to the controller
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' }) // Add a description to the endpoint
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @ApiOperation({ summary: 'Get a user by id' }) // Add a description to the endpoint
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @ApiOperation({ summary: 'Get all users' }) // Add a description to the endpoint
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @ApiOperation({ summary: 'Delete user by id' }) // Add a description to the endpoint
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @ApiOperation({ summary: 'Update user' }) // Add a description to the endpoint
  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
