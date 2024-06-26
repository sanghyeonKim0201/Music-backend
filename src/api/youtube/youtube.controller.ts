import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
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

  @Get('playlists')
  @ApiOperation({ summary: 'get playlists' })
  async playlists(@Payload() payload: PayloadDTO) {
    return await this.youtubeService.getPlayLists(payload.id);
  }

  @Get('/playlist/:playlistId')
  @ApiOperation({ summary: 'get playlist data' })
  async playlist(
    @Payload() playload: PayloadDTO,
    @Param('playlistId') playlistId: string,
  ) {
    return await this.youtubeService.getPlaylist(playload.id, playlistId);
  }

  @Get('playlist/item/:playlistId')
  @ApiOperation({ summary: 'get playlist items' })
  async itmes(
    @Payload() payload: PayloadDTO,
    @Param('playlistId') playlistId: string,
  ) {
    // PLBJFwQTTuErTJJoLzfsGviKY8LQFyYGOH
    return await this.youtubeService.getPlaylistItems(payload.id, playlistId);
  }
  @Get('playlists/items')
  async AllItmes(@Payload() paylaod: PayloadDTO) {
    return await this.youtubeService.getAllPlaylistItems(paylaod.id);
  }
  @Get('videos')
  @ApiOperation({ summary: 'get search video data' })
  async allVideos(@Payload() payload: PayloadDTO) {
    return await this.youtubeService.getMostVideo(payload.id);
  }
  @Get('likes')
  @ApiOperation({ summary: 'get like video data' })
  async likeVideos(@Payload() payload: PayloadDTO) {
    return await this.youtubeService.getLikeVideo(payload.id);
  }
  @Get('dislikes')
  @ApiOperation({ summary: 'get dislike videos data' })
  async dislikesVideos(@Payload() payload: PayloadDTO) {
    return await this.youtubeService.getDislikeVideos(payload.id);
  }
  @Get('subscriber')
  @ApiOperation({ summary: 'get subscriber' })
  async subscriber(@Payload() payload: PayloadDTO) {
    return await this.youtubeService.getSubscriber(payload.id);
  }

  @Get('search')
  @ApiOperation({ summary: 'get search data' })
  async search(
    @Payload() payload: PayloadDTO,
    @Query() query: { keyword: string },
  ) {
    return await this.youtubeService.getSearchData(payload.id, query.keyword);
  }
  @Get('recent-video')
  @ApiOperation({ summary: 'get recent' })
  async recentVideo(@Payload() payload: PayloadDTO) {
    return await this.youtubeService.getRecentSearch(payload.id);
  }
  @Get('all-rating')
  @ApiOperation({ summary: 'get dislike and like videos' })
  async allRating(@Payload() payload: PayloadDTO) {
    const likeVideos = await this.youtubeService.getLikeVideo(payload.id);
    const dislikeVideos = await this.youtubeService.getDislikeVideos(
      payload.id,
    );

    return { likeVideos, dislikeVideos };
  }
}
