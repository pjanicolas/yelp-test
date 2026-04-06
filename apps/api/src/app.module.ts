import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YelpModule } from "./yelp/yelp.module";

@Module({
  imports: [
      ConfigModule.forRoot(),
      YelpModule
  ],
  controllers: [
      AppController
  ],
  providers: [
      AppService
  ],
})
export class AppModule {}
