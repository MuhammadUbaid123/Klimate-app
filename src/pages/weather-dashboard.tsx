import React from 'react'
import { Button } from '../components/ui/button'
import { AlertCircle, MapPin, RefreshCw } from 'lucide-react'
import { useGeolocation } from '@/hooks/use-geolocation';
import WeatherSkeleton from '@/components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import CurrentWeather from '@/components/current-weather';
import HourlyTemprature from '@/components/hourly-temprature';
import WeatherDetails from '@/components/weather-details';
import WeatherForecast from '@/components/weather-forecast';


const WeatherDashboard = () => {
	/* 
	* Get the data from my custom made hook 
	*/
	const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();


	const weatherQuery = useWeatherQuery(coordinates);
	const forecastQuery = useForecastQuery(coordinates);
	const locationQuery = useReverseGeocodeQuery(coordinates);

	const handleRefresh = () => {
		getLocation();
		if (coordinates) {
			// reload weather data
			weatherQuery.refetch();
			// reload forecast data
			forecastQuery.refetch();
			// reload location data
			locationQuery.refetch();
		}
	}


	if (locationLoading) {
		return <WeatherSkeleton />;
	}


	/* 
	* If not permitted the location 
	*/
	if (locationError) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Location Error</AlertTitle>
				<AlertDescription className='flex flex-col gap-4'>
					<p>{locationError}</p>
					<Button onClick={getLocation} variant={"outline"} className='w-fit'>
						<MapPin className="mr-2 h-4 w-4" />
						Enable Location
					</Button>
				</AlertDescription>
			</Alert>
		);
	}
	/* ---------------------- */
	/*
	* If no coordinates are coming 
	*/
	if (!coordinates) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Location Error</AlertTitle>
				<AlertDescription className='flex flex-col gap-4'>
					<p>Please enable the location access to see your location weather!</p>
					<Button onClick={getLocation} variant={"outline"} className='w-fit'>
						<MapPin className="mr-2 h-4 w-4" />
						Enable Location
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	const locationName = locationQuery.data?.[0];

	if (weatherQuery.error || forecastQuery.error) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription className='flex flex-col gap-4'>
					<p>Failed to fetch weather data. Please try again!</p>
					<Button onClick={handleRefresh} variant={"outline"} className='w-fit'>
						<RefreshCw className="mr-2 h-4 w-4" />
						retry
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	if (!weatherQuery.data || !forecastQuery.data) {
		return (
			<WeatherSkeleton />
		);
	}

	return (
		<div className='space-y-4'>
			{/* Favorite cities */}
			<div className='flex items-center justify-between'>
				<h1 className='text-xl font-bold tracking-tight'>My Location</h1>
				<Button
					variant={"outline"}
					size={"icon"}
					onClick={handleRefresh}
					disabled={weatherQuery.isFetching || forecastQuery.isFetching}
				>
					<RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`} />
				</Button>
			</div>

			{/* Current and Hourly Weather  */}
			<div className='grid gap-6'>
				<div className='flex flex-col lg:flex-row gap-4'>
					{/* current weather  */}
					<CurrentWeather
						data={weatherQuery.data}
						locationName={locationName}
					/>
					{/* hourly temprature  */}
					<HourlyTemprature data={forecastQuery.data} />
				</div>

				<div className='grid gap-6 md:grid-cols-2 items-start'>
					{/* details  */}
					<WeatherDetails data={weatherQuery.data} />
					{/* forecast  */}
					<WeatherForecast data={forecastQuery.data} />
				</div>
			</div>

		</div>
	)
}

export default WeatherDashboard
