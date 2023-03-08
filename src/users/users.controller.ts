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
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from './guards/auth.guard';

@ApiTags('users') // Add a tag to the controller
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @ApiOperation({ summary: 'Who am i' }) // Add a description to the endpoint
  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }

  @ApiOperation({ summary: 'Who am i' }) // Add a description to the endpoint
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'sign out as current user' }) // Add a description to the endpoint
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }
  @ApiOperation({ summary: 'Create a new user' }) // Add a description to the endpoint
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @ApiOperation({ summary: 'Sign in as a user' }) // Add a description to the endpoint
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @ApiOperation({ summary: 'Get a user by id' }) // Add a description to the endpoint
  @Get('/:id')
  @UseGuards(AuthGuard)
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @ApiOperation({ summary: 'Get all users' }) // Add a description to the endpoint
  @Get()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
