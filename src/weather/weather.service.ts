import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AxiosError } from 'axios';

@Injectable()
export class WeatherService {

    constructor(private httpService: HttpService) {}

    getWeatherData(lat: number, lon: number): Observable<any> {
        if (isNaN(lat) || isNaN(lon)) {
            throw new Error('Invalid latitude or longitude');
        }
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
        return this.httpService.get(url).pipe(
            map(response => response.data),
            catchError((error: AxiosError) => {
                if (error.response) {
                    console.error(`Error: ${error.response.data}`);
                    throw new HttpException(error.response.data, error.response.status);
                } else {
                    console.error(`Error: ${error.message}`);
                    throw new HttpException('Unable to fetch weather data', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }),
        );
    }
}
