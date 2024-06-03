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
  async search(userId: string) {
    const response = (await this.authService.getYoutubeAPI(userId)).search.list(
      {
        part: ['snippet'],
      },
    );
    return (await response).data;
  }
  async likeVideo(userId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.videos.list({
      part: ['snippet'],
      myRating: 'like',
    });
    return response.data;
  }
}
