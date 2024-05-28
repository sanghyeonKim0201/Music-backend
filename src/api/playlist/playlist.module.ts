import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './repository/playlist.repository';
import { JwtAccessAuthGuard } from 'src/common/utils/guard/jwtAccessAuthGuard';
import { HttpModule } from '@nestjs/axios';
import { GoogleStrategy } from 'src/common/utils/strategy/GoogleStrategy';

@Module({
  imports: [HttpModule],
  controllers: [PlaylistController],
  providers: [
    PlaylistService,
    PlaylistRepository,
    JwtAccessAuthGuard,
    GoogleStrategy,
  ],
})
export class PlaylistModule {}
