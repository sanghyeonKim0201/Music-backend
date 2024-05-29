import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/common/utils/guard/jwtAccessAuthGuard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Payload } from 'src/common/utils/decorator/payload.decorator';
import { PayloadDTO } from 'src/common/models/payload.dto';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
@UseGuards(JwtAccessAuthGuard)
@ApiTags('Youtube API')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get()
  @ApiOperation({ summary: 'index page dat api' })
  async indexPage(@Payload() payload: PayloadDTO) {
    return await this.youtubeService.getPlayLists(payload.id);
  }
  @Get('playlist-items')
  async itmes(@Payload() payload: PayloadDTO) {
    return await this.youtubeService.getPlaylistItems(payload.id);
  }
}
