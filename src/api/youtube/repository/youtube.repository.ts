import { Injectable } from '@nestjs/common';
import { google_token, user } from '@prisma/client';
import { PrismaService } from 'src/api/prisma/prisma.service';

@Injectable()
export class YoutubeRepository {
  constructor(private prisma: PrismaService) {}

  async findUserById(userId: string): Promise<user> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  }
  async findGoogleTokensByUserId(userId: string): Promise<google_token> {
    const googleTokens = await this.prisma.google_token.findFirst({
      where: {
        user_id: userId,
      },
    });
    return googleTokens;
  }
}
