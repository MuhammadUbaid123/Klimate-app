export interface Coordinates {
    lat: number;
    lon: number;
}



/* 
* For fetching current weather 
*/

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}


export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    dt: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
}
/* --------------- For fetching current weather (end) --------------- */

/*
* For fetching current weather forecast
*/
export interface ForecastData {
    cod: string;
    message: number;
    cnt: number;
    list: Array<{
        dt: number;
        main: WeatherData['main'];
        weather: WeatherData['weather'];
        wind: WeatherData['wind'];
        dt_txt: string;
    }>;
    city: {
        name: string;
        country: string;
        sunrise: number;
        sunset: number;
    };
}
/* --------------- For fetching current weather forecast (end) --------------- */

/*
* For fetching reverse geo code
*/

export interface GeocodingResponse {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}