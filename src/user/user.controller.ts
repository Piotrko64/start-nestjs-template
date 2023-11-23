import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { UserService } from './user.service';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './dtos/user.dto';
import { PeterNameGuard } from 'src/guards/peter-name/peter-name.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get('/query')
  getQuery(@Query('role') role: string) {
    return role;
  }

  @Get('/list/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    // https://docs.nestjs.com/pipes
    return new UserEntity(await this.userService.getUser(id));
  }

  @Post('/addUser')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(PeterNameGuard)
  async addUser(@Body(ValidationPipe) user: CreateUserDto) {
    //EXPOSE
    return new UserEntity(await this.userService.addUser(user));
  }
}
