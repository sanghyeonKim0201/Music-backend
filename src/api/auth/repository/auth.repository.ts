import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/api/prisma/prisma.service';
import { CreateUserDTO } from '../dto/user/create-user.dto';
import { jwt_token, user } from '@prisma/client';
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
  async findTokenByUserId(userId: string): Promise<jwt_token> {
    const token = await this.prisma.jwt_token.findFirst({
      where: {
        user_id: userId,
      },
    });
    return token;
  }
  async upsertToken(tokenDTO: CreateTokenDTO) {
    await this.prisma.jwt_token.upsert({
      create: tokenDTO,
      update: {
        refresh_token: tokenDTO.refresh_token,
      },
      where: {
        user_id: tokenDTO.user_id,
      },
    });
  }
  async findGoogleTokenByUserId(userId: string) {
    const googleTokens = await this.prisma.google_token.findFirst({
      where: {
        user_id: userId,
      },
    });
    return googleTokens;
  }
  async updateGoogle(accessToken: string, userId: string) {
    await this.prisma.google_token.update({
      data: {
        access_token: accessToken,
      },
      where: {
        user_id: userId,
      },
    });
  }
  async upsertGoogle(payload: {
    userId: string;
    accessToken?: string;
    refreshToken?: string;
  }) {
    const { userId, accessToken, refreshToken } = payload;

    const data: { access_token?: string; refresh_token?: string } = {};
    if (accessToken) data.access_token = accessToken;
    if (refreshToken) data.refresh_token = refreshToken;

    if (Object.keys(data).length > 0) {
      await this.prisma.google_token.upsert({
        update: data,
        create: {
          user_id: userId,
          access_token: accessToken ?? '',
          refresh_token: refreshToken ?? '',
        },
        where: {
          user_id: userId,
        },
      });
    }
  }
  async createToken(createTokenDTO: CreateTokenDTO): Promise<void> {
    await this.prisma.jwt_token.create({
      data: createTokenDTO,
    });
  }
  async updateToken(updateTokenDTO: UpdateTokenDTO): Promise<void> {
    await this.prisma.jwt_token.update({
      data: {
        refresh_token: updateTokenDTO.refresh_token,
      },
      where: {
        user_id: updateTokenDTO.user_id,
      },
    });
  }
  async deleteToken(userId: string) {
    await this.prisma.jwt_token.update({
      data: {
        refresh_token: '',
      },
      where: {
        user_id: userId,
      },
    });
  }
  async deleteGoogleToken(userId: string) {
    await this.prisma.google_token.update({
      data: {
        access_token: '',
      },
      where: {
        user_id: userId,
      },
    });
  }
}
