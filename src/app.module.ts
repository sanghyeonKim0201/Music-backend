import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [HomeModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
