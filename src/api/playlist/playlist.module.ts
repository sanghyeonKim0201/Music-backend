import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './repository/playlist.repository';
import { JwtAccessAuthGuard } from 'src/utils/guard/jwtAccessAuthGuard';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository, JwtAccessAuthGuard],
})
export class PlaylistModule {}
