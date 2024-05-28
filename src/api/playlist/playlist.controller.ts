import { Controller, Get, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { JwtAccessAuthGuard } from 'src/common/utils/guard/jwtAccessAuthGuard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Payload } from 'src/common/utils/decorator/payload.decorator';
import { PayloadDTO } from 'src/common/models/payload.dto';

@Controller('playlist')
@UseGuards(JwtAccessAuthGuard)
@ApiTags('PlayList API')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  @ApiOperation({ summary: 'index page dat api' })
  indexPage(@Payload() payload: PayloadDTO) {
    this.playlistService.getAllPlaylist(payload.accessToken);
  }
}
