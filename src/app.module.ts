import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { PrismaModule } from './api/prisma/prisma.module';
import { YoutubeModule } from './api/youtube/youtube.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    YoutubeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
