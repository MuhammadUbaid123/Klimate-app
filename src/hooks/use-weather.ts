import type { Coordinates } from "@/api/types";
import { weatherApi } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";


/*
* I'm using tanstack query here to make fetching weather data easier
* And catching the data to enhance the speed of the app
*/

export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather", coords] as const,
    forecast: (coords: Coordinates) => ["forecast", coords] as const,
    location: (coords: Coordinates) => ["location", coords] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates|null){
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates?? {lat: 0, lon:0}),
        queryFn: () => coordinates ? weatherApi.getCurrentWeather(coordinates):null,
        enabled: !!coordinates
    })
}

export function useForecastQuery(coordinates: Coordinates|null){
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates?? {lat: 0, lon:0}),
        queryFn: () => coordinates ? weatherApi.getForeCast(coordinates):null,
        enabled: !!coordinates
    })
}
export function useReverseGeocodeQuery(coordinates: Coordinates|null){
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates?? {lat: 0, lon:0}),
        queryFn: () => coordinates ? weatherApi.reverseGeoCode(coordinates):null,
        enabled: !!coordinates
    })
}