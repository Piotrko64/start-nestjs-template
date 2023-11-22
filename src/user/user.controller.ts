import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get('')
  getAllUser() {
    return this.prisma.user.findMany();
  }

  @Get('add')
  add() {
    return this.prisma.user.create({
      data: { email: 'piotrko@sdf.pl', name: 'piotr' },
    });
  }
}
