import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { UsersService } from './users.service';
// import { UsersService } from './users.service';
// import { User } from './schemas/user.schema';
// import { User } from './schemas/user.schema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-cat.dto';

@Controller('auth')
export class UserController {
  constructor(private UsersService: UsersService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const saltOrRounds = 10;
      const password = createUserDto.password;
      const passwordhash = await bcrypt.hash(password, saltOrRounds);

      createUserDto.password = passwordhash;
      const createdUser = await this.UsersService.create(createUserDto);
      return {
        status: 'success',
        data: createdUser,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
