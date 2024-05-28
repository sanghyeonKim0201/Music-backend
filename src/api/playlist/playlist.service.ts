import { Injectable } from '@nestjs/common';
import { PlaylistRepository } from './repository/playlist.repository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { GoogleStrategy } from 'src/common/utils/strategy/GoogleStrategy';

@Injectable()
export class PlaylistService {
  constructor(
    private playlistRepository: PlaylistRepository,
    private httpService: HttpService,
    private configService: ConfigService,
    private googleStrategy: GoogleStrategy,
  ) {}

  async getAllPlaylist(accessToken: string): Promise<any> {
    // const oauth2Client = new google.auth.OAuth2(
    //   this.configService.get('GOOGLE_CLIENT_ID'),
    //   this.configService.get('GOOGLE_CLIENT_SECRET'),
    //   this.configService.get('GOOGLE_CLIENT_REDIRECT'),
    // );
    // const url = `https://www.googleapis.com/youtube/v3/search?access_token=${accessToken}&part=snippet&maxResults=10`;
    // const params = {
    //   key: accessToken,
    //   part: 'snippet',
    //   type: 'video',
    //   maxResults: 10,
    // };
    // const { data } = await firstValueFrom(
    //   this.httpService.get(url).pipe(
    //     catchError((error) => {
    //       throw new InternalServerErrorException(error);
    //     }),
    //   ),
    // );
    // return data;
    const oauth2Client = new google.auth.OAuth2();
  }
}
