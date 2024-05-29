import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { YoutubeRepository } from './repository/youtube.repository';

@Module({
  controllers: [YoutubeController],
  providers: [YoutubeService, YoutubeRepository],
})
export class YoutubeModule {}
