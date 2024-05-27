import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/api/prisma/prisma.service';
import { CreateUserDTO } from '../dto/user/create-user.dto';
import { token, user } from '@prisma/client';
import { CreateTokenDTO } from '../dto/token/create-token.dto';
import { UpdateTokenDTO } from '../dto/token/update-token.dto';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findById(userId: string): Promise<user> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  }
  async createUser(createUserDTO: CreateUserDTO): Promise<void> {
    await this.prisma.user.create({
      data: createUserDTO,
    });
  }
  async findTokenByUserId(userId: string): Promise<token> {
    const token = await this.prisma.token.findFirst({
      where: {
        user_id: userId,
      },
    });
    return token;
  }
  async upsertToken(userId: string, refreshToken: string) {
    await this.prisma.token.upsert({
      create: {
        user_id: userId,
        refresh_token: refreshToken,
      },
      update: {
        refresh_token: refreshToken,
      },
      where: {
        user_id: userId,
      },
    });
  }
  async createToken(createTokenDTO: CreateTokenDTO): Promise<void> {
    await this.prisma.token.create({
      data: createTokenDTO,
    });
  }
  async updateToken(updateTokenDTO: UpdateTokenDTO): Promise<void> {
    await this.prisma.token.update({
      data: {
        refresh_token: updateTokenDTO.refresh_token,
      },
      where: {
        user_id: updateTokenDTO.user_id,
      },
    });
  }
  async deleteToken(userId: string) {
    await this.prisma.token.update({
      data: {
        refresh_token: null,
      },
      where: {
        user_id: userId,
      },
    });
  }
}
