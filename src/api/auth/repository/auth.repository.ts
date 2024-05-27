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
  async upsertToken(tokenDTO: CreateTokenDTO) {
    await this.prisma.token.upsert({
      create: tokenDTO,
      update: {
        refresh_token: tokenDTO.refresh_token,
        access_token: tokenDTO.access_token,
      },
      where: {
        user_id: tokenDTO.user_id,
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
        refresh_token: '',
        access_token: '',
      },
      where: {
        user_id: userId,
      },
    });
  }
}
