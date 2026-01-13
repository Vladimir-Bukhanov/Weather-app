import { useEffect, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import type { IWeather, IWeatherData } from '../../types/weatherDataTypes'
import clear from '/clear.png'
import cloudy from '/cloudy.png'
import drizzle from '/drizzle.png'
import humidity from '/humidity.png'
import rain from '/rain.png'
import snow from '/snow.png'
import wind from '/wind.png'

export default function Weather() {
	const [weatherData, setWeatherData] = useState<IWeather>({} as IWeather)

	const inputRef = useRef<HTMLInputElement>(null)

	const allIcons = {
		'01d': clear,
		'01n': clear,
		'02d': cloudy,
		'02n': cloudy,
		'03d': cloudy,
		'03n': cloudy,
		'04d': drizzle,
		'04n': drizzle,
		'09d': rain,
		'09n': rain,
		'10d': rain,
		'10n': rain,
		'13d': snow,
		'13n': snow,
	}

	const getWeather = async (city: string) => {
		if (city.trim().length === 0) {
			alert('Enter city name')
			return
		}
		try {
			inputRef.current!.value = ''
			const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
				import.meta.env.VITE_APP_ID
			}`
			const response = await fetch(url)
			const data: IWeatherData = await response.json()
			if (!response.ok) {
				alert(data.message)
				return
			}
			const icon: string = allIcons[data.weather[0].icon] || clear
			setWeatherData({
				humidity: data.main.humidity,
				cityName: data.name,
				windSpeed: data.wind.speed,
				temperature: Math.floor(data.main.temp),
				icon: icon,
			})
		} catch (error: unknown) {
			setWeatherData({} as IWeather)
			alert(error)
		}
	}

	useEffect(() => {
		getWeather('Minsk')
	}, [])

	return (
		<div className="container relative mx-auto my-20 max-w-150">
			<div className="w-full bg-violet-600 rounded-xl flex flex-col py-10 items-center">
				<div className="flex h-10 sm:h-12 items-center justify-between sm:w-[80%] mb-10 w-[90%]">
					<input
						type="text"
						placeholder="Search"
						className="w-[85%] bg-white outline-0 rounded-2xl h-full px-4 text-xl mr-2 sm:mr-4"
						ref={inputRef}
					/>
					<div
						className="relative bg-white w-10 sm:w-12 h-full rounded-[50%] cursor-pointer flex items-center justify-center"
						onClick={() => getWeather(inputRef.current!.value)}
					>
						<CiSearch className="text-black sm:text-3xl text-2xl pointer-events-none" />
					</div>
				</div>
				{weatherData.cityName ? (
					<>
						<img
							className="w-20 mb-10"
							src={weatherData.icon}
							alt="weather-icon"
						/>

						<p className="sm:text-6xl text-5xl text-white mb-5">
							{weatherData.temperature}°С
						</p>
						<p className="sm:text-6xl text-5xl text-white sm:mb-20 mb-10">
							{weatherData.cityName}
						</p>
						<div className="flex justify-between sm:items-center w-[80%]">
							<span className="sm:flex text-white text-xl">
								<img
									className="mr-2 sm:w-13 w-11"
									src={humidity}
									alt="humidity"
								/>
								<div>
									<p>{weatherData.humidity}%</p>
									<p>Humidity</p>
								</div>
							</span>
							<span className="sm:flex text-white text-xl">
								<img
									className="mr-2 sm:w-13 w-11"
									src={wind}
									alt="wind"
								/>
								<div>
									<p>{weatherData.windSpeed} Km/h</p>
									<p>Wind Speed</p>
								</div>
							</span>
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}
