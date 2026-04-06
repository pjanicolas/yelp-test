import {YelpService} from "./yelp.service";
import {Controller, Get, Query} from "@nestjs/common";
import {GetRestaurantByCityNameDTO} from "./dtos";

@Controller('yelp')
export class YelpController {
    constructor(private service: YelpService) {}

    @Get()
    async restaurantByCity(
        @Query() query: GetRestaurantByCityNameDTO,
    ) {
        return await this.service.restaurantByCity(query.city);
    }
}