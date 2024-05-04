import axios from "axios";
import { useEffect, useState } from "react";

interface IForecast {
    temperature: {
        max: number;
        min: number;
    };
    precip: {
        duration: number;
        sum: number
    };
    wind: {
        direction: number
        speed: number;
    };
    sunrise: string;
    sunset: string;
    date: string;
    uv: number
}

const App = () => {
    const [forecast, setForecast] = useState<IForecast | undefined>();

    useEffect(() => {
        new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition((position) =>
                resolve({
                    latitude: position.coords.latitude.toString(),
                    longitude: position.coords.longitude.toString()
                })
            );
        })
            .then((location) =>
                axios(
                    "https://api.open-meteo.com/v1/forecast?latitude=" +
                        location.latitude +
                        "&longitude=" +
                        location.longitude +
                        "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,wind_speed_10m_max,wind_direction_10m_dominant&forecast_days=1"
                )
            )
            .then((res) => setForecast({
                temperature: {
                    max: res.data.daily.temperature_2m_max[0],
                    min: res.data.daily.temperature_2m_min[0],
                },
                precip: {
                    duration: res.data.daily.precipitation_hours[0],
                    sum: res.data.daily.precipitation_sum[0],
                },
                wind: {
                    direction: res.data.daily.wind_speed_10m_max[0],
                    speed: res.data.daily.wind_direction_10m_dominant[0],
                },
                sunrise: res.data.daily.sunrise[0],
                sunset: res.data.daily.sunset[0],
                date: res.data.daily.time[0],
                uv: res.data.daily.uv_index_max[0]
            }))
    }, []);

    return <div>{forecast?.date}</div>;
};

export default App;
