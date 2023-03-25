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
import { Twilio } from 'twilio';
import * as dotenv from 'dotenv';

const accountSid = 'AC828ae7f982a115e0b06e33c4f9a7a592';
const authToken = '740f0b08a25f6856e1d121c3ad6811b1';
const client = new Twilio(accountSid, authToken);

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

  // @ApiOperation({ summary: 'Send an SMS' })
  // @Post('/send-sms')
  // async sendSms(@Body() body: { to: string; message: string }) {
  //   try {
  //     const { to, message } = body;
  //     const response = await client.messages.create({
  //       from: '+15074311809',
  //       to: '+917842286797',
  //       body: 'Hai there!',
  //     });
  //     return `Message sent: ${response.sid}`;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('An error occurred while sending the message.');
  //   }
  // }

  // @ApiOperation({ summary: 'Send an SMS' })
  // @Post('/send-sms')
  // async sendSms(@Body() smsData: { from: string; to: string; body: string }) {
  //   try {
  //     const { from, to, body } = smsData;
  //     const response = await client.messages.create({
  //       from: from,
  //       to: to,
  //       body: body,
  //     });
  //     return `Message sent: ${response.sid}`;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('An error occurred while sending the message.');
  //   }
  // } Actual code

  @ApiOperation({ summary: 'Send an SMS' })
  @Post('/send-sms')
  async sendSms(@Body() smsData: { to: string; body: string }) {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = new Twilio(accountSid, authToken);
      const response = await client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: smsData.to,
        body: smsData.body,
      });
      return `Message sent: ${response.sid}`;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while sending the message.');
    }
  }

  @Post('/send-whatsapp-message')
  async sendMessage(@Body() body: { to: string; message: string }) {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = new Twilio(accountSid, authToken);

      const message = await client.messages.create({
        from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER, // your Twilio WhatsApp sandbox number
        to: 'whatsapp:' + body.to,
        body: body.message,
      });

      console.log(message.sid); // show success message
      return `Message sent: ${message.sid}`;
    } catch (error) {
      console.error(error);
      // show error message
      throw new Error('An error occurred while sending the message.');
    }
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
