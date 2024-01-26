/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      // User not found
      throw new UnauthorizedException();
    }
    console.log('user', user);
    console.log('password', password);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('mat', isPasswordValid);
    console.log('jjj', user.password);
    // if (!isPasswordValid) {
    //   // Password does not match
    //   throw new UnauthorizedException();
    // }

    console.log('isPasswordValid', isPasswordValid);
    const payload = { sub: user.name, email: user.email };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'test',
      }),
    };
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
