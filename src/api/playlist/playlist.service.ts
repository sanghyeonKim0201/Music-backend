import { Injectable } from '@nestjs/common';
import { PlaylistRepository } from './repository/playlist.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PlaylistService {
  constructor(
    private playlistRepository: PlaylistRepository,
    private jwtService: JwtService,
  ) {}

  getAllPlaylist(accessToken: string) {
    const googleAccessToken = this.jwtService.verify(accessToken);
    console.log(googleAccessToken);
  }
}
