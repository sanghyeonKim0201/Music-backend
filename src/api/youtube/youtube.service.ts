import { Injectable, UseInterceptors } from '@nestjs/common';
import { YoutubeRepository } from './repository/youtube.repository';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { AuthService } from '../auth/auth.service';

@Injectable()
@UseInterceptors(ExceptionInterceptor)
export class YoutubeService {
  constructor(
    private youtubeRepository: YoutubeRepository,
    private authService: AuthService,
  ) {}

  async getPlayLists(userId: string): Promise<any> {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.playlists.list({
      part: ['snippet', 'contentDetails', 'status', 'id'],
      mine: true,
      maxResults: 10,
    });
    return response.data;
  }

  async getPlaylistItems(userId: string, playlistId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.playlistItems.list({
      part: ['snippet'],
      playlistId,
    });
    return response.data;
  }

  async getMostVideo(userId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);

    // const category = await youtube.videoCategories.list({
    //   part: ['snippet'],
    //   regionCode: 'KR',
    // });

    // return category.data;
    const response = await youtube.videos.list({
      part: ['snippet'],
      chart: 'mostPopular',
      videoCategoryId: '10',
      maxResults: 50,
      regionCode: 'KR',
    });
    return response.data;
  }
  async getLikeVideo(userId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.videos.list({
      part: ['snippet'],
      myRating: 'like',
      maxResults: 50,
    });
    return response.data;
  }
}
