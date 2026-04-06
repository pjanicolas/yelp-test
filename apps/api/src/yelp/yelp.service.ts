import {Inject, Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {AxiosError} from "axios";
import {catchError, firstValueFrom} from "rxjs";
import {ConfigService} from "@nestjs/config";
import {CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

@Injectable()
export class YelpService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly httpService: HttpService,
        private configService: ConfigService
    ) {}

    restaurantByCity = async (city: string, page: number = 1) => {
        const domain = this.configService.get<string>('YELP_DOMAIN');
        const apiKey = this.configService.get<string>('YELP_API_KEY');

        const headers: Record<string, string> = {'Authorization': `Bearer ${apiKey}`};
        const params = {
            location: city,
            term: 'restaurant',
            limit: 20,
            offset: 0 * (page - 1),
            sort_by: 'rating'
        };
        const cacheKey: string = JSON.stringify({ city, page});
        const existingCache: string|null|undefined = await this.cacheManager.get(cacheKey);
        if (existingCache) {
            console.log('from cache');
            return JSON.parse(existingCache);
        }
        const { data } = await firstValueFrom(
            this.httpService.get(`${domain}/v3/businesses/search`, { headers: headers, params: params}).pipe()
        );
        const toCache: string = JSON.stringify(data);
        await this.cacheManager.set(cacheKey, toCache, 1000 * 60 * 30); // cache for 30 mins
        console.log('not from cache');
        return JSON.parse(toCache);
    }
}