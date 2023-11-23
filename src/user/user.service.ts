import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getAllUser() {
    return this.prisma.user.findMany();
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  addUser(body: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
        role: 'USER',
      },
    });
  }
}
