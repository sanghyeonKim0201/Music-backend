import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { JwtAccessAuthGuard } from 'src/utils/guard/jwtAccessAuthGuard';

@Module({
  controllers: [HomeController],
  providers: [HomeService, JwtAccessAuthGuard],
})
export class HomeModule {}
