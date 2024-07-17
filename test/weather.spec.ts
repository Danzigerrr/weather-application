// weather.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from '../src/weather/weather.controller';
import { WeatherService } from '../src/weather/weather.service';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule

describe('WeatherController', () => {
    let controller: WeatherController;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [HttpModule], // Include HttpModule here
            controllers: [WeatherController],
            providers: [WeatherService],
        }).compile();

        controller = module.get<WeatherController>(WeatherController);
    });

    afterAll(async () => {
        await module.close();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should handle invalid latitude and longitude input', async () => {
        const latitude = 'abc' as any; // Simulate invalid input type
        const longitude = 'xyz' as any; // Simulate invalid input type

        try {
            await controller.getWeather(latitude, longitude);
        } catch (error) {
            expect(error.message).toContain('Invalid latitude or longitude');
        }
    });

    it('should handle empty latitude and longitude input', async () => {
        const latitude = '' as any; // Simulate invalid input type
        const longitude = '' as any; // Simulate invalid input type

        try {
            await controller.getWeather(latitude, longitude);
        } catch (error) {
            expect(error.message).toContain('Invalid latitude or longitude');
        }
    });

    it('should handle latitude and longitude out of range', async () => {
        const latitude = 1000; // Latitude out of range
        const longitude = -2000; // Longitude out of range

        try {
            await controller.getWeather(latitude, longitude);
        } catch (error) {
            expect(error.message).toContain('Latitude and longitude are out of range');
        }
    });
});
