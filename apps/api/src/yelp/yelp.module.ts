import {Module} from "@nestjs/common";
import {YelpController} from "./yelp.controller";
import {YelpService} from "./yelp.service";
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot(),
        CacheModule.register()
    ],
    controllers: [YelpController],
    providers: [YelpService],
})
export class YelpModule {}