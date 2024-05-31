import {
  Controller,
  Get,
  Param,
  // UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/common/utils/guard/jwtAccessAuthGuard';
import {
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Payload } from 'src/common/utils/decorator/payload.decorator';
import { PayloadDTO } from 'src/common/models/payload.dto';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
@UseGuards(JwtAccessAuthGuard)
@ApiTags('Youtube API')
@ApiUnauthorizedResponse({
  description: 'jwt 인증 실패',
})
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  // @Get()
  // @ApiOperation({ summary: 'index page dat api' })
  // async indexPage(@Payload() payload: PayloadDTO) {}

  @Get('playlists')
  @ApiOperation({ summary: 'get playlists' })
  async playlists(@Payload() payload: PayloadDTO) {
    return await this.youtubeService.getPlayLists(payload.id);
  }

  @Get('playlists/items/:playlistId')
  @ApiOperation({ summary: 'get playlist items' })
  async itmes(
    @Payload() payload: PayloadDTO,
    @Param('playlistId') playlistId: string,
  ) {
    // PLBJFwQTTuErTJJoLzfsGviKY8LQFyYGOH
    return await this.youtubeService.getPlaylistItems(payload.id, playlistId);
  }

  @Get('video')
  @ApiOperation({ summary: 'get search video data' })
  async search(@Payload() payload: PayloadDTO) {
    return await this.youtubeService.search(payload.id);
  }
}
