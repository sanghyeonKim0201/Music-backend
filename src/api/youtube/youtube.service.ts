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

  async getPlayLists(userId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.playlists.list({
      part: ['snippet', 'contentDetails', 'status', 'id'],
      mine: true,
      maxResults: 50,
    });
    return response.data;
  }

  async getPlaylist(userId: string, playlistId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.playlists.list({
      part: ['snippet', 'contentDetails', 'status', 'id'],
      id: [playlistId],
      maxResults: 50,
    });
    return response.data;
  }

  async getPlaylistItems(userId: string, playlistId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.playlistItems.list({
      part: ['snippet', 'id', 'contentDetails'],
      maxResults: 50,
      playlistId,
    });
    return response.data;
  }
  async getAllPlaylistItems(userId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);

    const response = await youtube.playlists.list({
      part: ['snippet', 'contentDetails', 'status', 'id'],
      mine: true,
      maxResults: 50,
    });

    const result = Promise.all(
      response.data.items.map(async (o) => {
        const items = await youtube.playlistItems.list({
          part: ['snippet', 'contentDetails'],
          maxResults: 50,
          playlistId: o.id,
        });
        return items.data;
      }),
    );

    return result;
  }
  async getMostVideo(userId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);

    // const category = await youtube.videoCategories.list({
    //   part: ['snippet'],
    //   regionCode: 'KR',
    // });

    // return category.data;
    const response = await youtube.videos.list({
      part: ['snippet', 'contentDetails'],
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
      part: ['snippet', 'contentDetails'],
      myRating: 'like',
      maxResults: 50,
    });
    return response.data;
  }
  async getSubscriber(userId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.subscriptions.list({
      part: ['snippet'],
      mine: true,
      maxResults: 50,
    });
    return response.data;
  }
  async getRecentSearch(userId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.search.list({
      part: ['snippet'],
      order: 'date',
      videoCategoryId: '10',
      maxResults: 50,
      regionCode: 'KR',
      type: ['video'],
    });
    return response.data;
  }
  async getSearchData(userId: string, searchKeyword: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.search.list({
      part: ['snippet'],
      maxResults: 50,
      videoCategoryId: '10',
      regionCode: 'KR',
      type: ['video'],
      order: 'viewCount',
      q: searchKeyword,
    });
    return response.data;
  }
  async getDislikeVideos(userId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.videos.list({
      part: ['snippet', 'contentDetails'],
      myRating: 'dislike',
      maxResults: 50,
    });
    return response.data;
  }
  async insertPlaylist(userId: string) {
    const youtube = await this.authService.getYoutubeAPI(userId);
    const response = await youtube.playlists.insert({
      part: ['snippet'],
    });
    return response.data;
  }
}
