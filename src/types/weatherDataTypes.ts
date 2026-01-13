interface IWeatherItem {
	id: number
	main: string
	description: string
	icon: string
}

export interface IWeatherData {
	base?: string
	clouds?: {
		all: number
	}
	cod?: number
	coord?: {
		lon: number
		lat: number
	}
	dt?: number
	id?: number
	main: {
		feels_like?: number
		grnd_level?: number
		humidity: number
		pressure?: number
		sea_level?: number
		temp: number
		temp_max?: number
		temp_min?: number
	}
	name: string
	sys?: {
		country: string
		sunrise: number
		sunset: number
	}
	timezone?: number
	visibility?: number
	weather: IWeatherItem[]
	wind: {
		speed: number
		deg?: number
		gust?: number
	}
	message: string | null
}

export interface IWeather {
	humidity: number
	temperature: number
	cityName: string
	windSpeed: number
	icon: string
}
