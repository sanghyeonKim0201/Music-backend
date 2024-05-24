import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/api/prisma/prisma.service';
import { CreateUserDTO } from './dto/user/create-user.dto';
import { token, user } from '@prisma/client';
import { CreateTokenDTO } from './dto/token/create-token.dto';
import { UpdateTokenDTO } from './dto/token/update-token.dto';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findById(userId: string): Promise<user> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (e) {
      throw new Error('유저 ID 조회를 실패하였습니다');
    }
  }
  async createUser(createUserDTO: CreateUserDTO): Promise<void> {
    try {
      await this.prisma.user.create({
        data: createUserDTO,
      });
    } catch (e) {
      throw new Error('유저 생성에 실패하였습니다.' + e);
    }
  }
  async findTokenByUserId(userId: string): Promise<token> {
    try {
      const token = await this.prisma.token.findFirst({
        where: {
          user_id: userId,
        },
      });
      return token;
    } catch (e) {
      throw new Error('token 조회를 실패하였습니다.' + e);
    }
  }
  async upsertToken(userId: string, refreshToken: string) {
    try {
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
    } catch (e) {
      throw new Error('토큰 갱신에 실패하였습니다.');
    }
  }
  async createToken(createTokenDTO: CreateTokenDTO): Promise<void> {
    try {
      await this.prisma.token.create({
        data: createTokenDTO,
      });
    } catch (e) {
      throw new Error('token 생성에 실패하였습니다.');
    }
  }
  async updateToken(updateTokenDTO: UpdateTokenDTO): Promise<void> {
    try {
      await this.prisma.token.update({
        data: {
          refresh_token: updateTokenDTO.refresh_token,
        },
        where: {
          user_id: updateTokenDTO.user_id,
        },
      });
    } catch (e) {}
  }
  async deleteToken(userId: string) {
    try {
      await this.prisma.token.update({
        data: {
          refresh_token: null,
        },
        where: {
          user_id: userId,
        },
      });
    } catch (e) {}
  }
}
