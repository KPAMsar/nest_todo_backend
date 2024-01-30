/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  Res,
  UseGuards,

  // eslint-disable-next-line prettier/prettier
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/auth.jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-cat.dto';
import * as cookie from 'cookie';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: CreateUserDto,
    @Request() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('signInDtonn', signInDto.email);
    const access_token = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    return res
      .cookie('access_token', access_token, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      })
      .send({ status: 'ok', token: access_token });
  }

  // return res.send({ status: 'ok', token: access_token });
}
