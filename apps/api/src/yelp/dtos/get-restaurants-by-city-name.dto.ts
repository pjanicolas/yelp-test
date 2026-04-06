import { IsString } from 'class-validator';

export class GetRestaurantByCityNameDTO {
    @IsString()
    city: string;
}