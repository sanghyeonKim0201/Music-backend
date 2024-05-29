import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, youtube_v3 } from 'googleapis';
import { YoutubeRepository } from './repository/youtube.repository';

@Injectable()
export class YoutubeService {
  constructor(
    private youtubeRepository: YoutubeRepository,
    private configService: ConfigService,
  ) {}
  async getYoutubeAPI(userId: string): Promise<youtube_v3.Youtube> {
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET'),
      this.configService.get('GOOGLE_CLIENT_REDIRECT'),
    );
    const googleToken =
      await this.youtubeRepository.findGoogleTokensByUserId(userId);
    oauth2Client.setCredentials({
      access_token: googleToken.access_token,
    });
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    return youtube;
  }
  async getPlayLists(userId: string): Promise<any> {
    const youtube = await this.getYoutubeAPI(userId);
    const response = await youtube.playlists.list({
      part: ['snippet', 'contentDetails', 'status', 'id'],
      mine: true,
      maxResults: 10,
    });
    return response.data;
  }
  async getPlaylistItems(userId: string) {
    const youtube = await this.getYoutubeAPI(userId);
    const response = await youtube.playlistItems.list({
      part: ['snippet'],
      playlistId: 'PLBJFwQTTuErTJJoLzfsGviKY8LQFyYGOH',
    });
    return response.data;
  }
}
