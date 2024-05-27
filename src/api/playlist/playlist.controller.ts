import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { JwtAccessAuthGuard } from 'src/utils/guard/jwtAccessAuthGuard';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('playlist')
@UseGuards(JwtAccessAuthGuard)
@ApiTags('PlayList API')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  @ApiOperation({ summary: 'index page dat api' })
  indexPage(@Req() req: Request) {
    this.playlistService.getAllPlaylist(req.cookies.accessToken);
  }
}
