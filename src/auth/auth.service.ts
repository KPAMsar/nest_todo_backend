/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string) {
    console.log('signInDto email', email);
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      console.log('User not found.');
      throw new UnauthorizedException();
    }

    console.log('Retrieved user:', user);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('isPasswordValid', isPasswordValid);

    return { isAvalidUser: isPasswordValid, userEmail: user.email };
  }

  async createAccessToken(email: string) {
    const payload = { sub: email };
    const access_token = this.jwtService.sign(payload);
    return access_token;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
