import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { PrismaModule } from './api/prisma/prisma.module';
import { PlaylistModule } from './api/playlist/playlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    PlaylistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
