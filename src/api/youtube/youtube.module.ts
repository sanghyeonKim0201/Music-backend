import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { YoutubeRepository } from './repository/youtube.repository';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';
import { AuthRepository } from '../auth/repository/auth.repository';

@Module({
  controllers: [YoutubeController],
  providers: [
    AuthService,
    AuthRepository,
    YoutubeService,
    YoutubeRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
  ],
})
export class YoutubeModule {}
