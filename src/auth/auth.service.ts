import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findById(id: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
  // async createUser(user: CreateUserDTO) {
  //   try {
  //     await this.prisma.user.create({
  //       data: user,
  //     });
  //   } catch (e) {}
  // }
  login() {}
}
