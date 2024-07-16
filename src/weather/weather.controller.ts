import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @Get()
    async getWeather(@Query('lat') lat: number, @Query('lon') lon: number) {
        if (isNaN(lat) || isNaN(lon)) {
            throw new Error('Invalid latitude or longitude');
        }
        return this.weatherService.getWeatherData(lat, lon);
    }
}
