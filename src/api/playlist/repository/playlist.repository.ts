import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/api/prisma/prisma.service';

@Injectable()
export class PlaylistRepository {
  constructor(private prisma: PrismaService) {}
}
