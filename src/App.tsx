/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";

interface IForecast {
    temperature: {
        max: number;
        min: number;
    };
    precip: {
        duration: number;
        sum: number;
    };
    wind: {
        direction: number;
        speed: number;
    };
    sun: {
        sunrise: any;
        sunset: any;
        uv: number;
    };
    date: any;
}

const App = () => {
    const [forecast, setForecast] = useState<IForecast | undefined>();

    useEffect(() => {
        new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition((position) =>
                resolve({
                    latitude: position.coords.latitude.toString(),
                    longitude: position.coords.longitude.toString(),
                })
            );
        })
            .then((location) =>
                axios(
                    "https://api.open-meteo.com/v1/forecast?latitude=" +
                        location.latitude +
                        "&longitude=" +
                        location.longitude +
                        "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,wind_speed_10m_max,wind_direction_10m_dominant&forecast_days=7"
                )
            )
            .then((res) =>
                setForecast({
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
                    sun: {
                        sunrise: res.data.daily.sunrise[0].slice(-5),
                        sunset: res.data.daily.sunset[0].slice(-5),
                        uv: res.data.daily.uv_index_max[0],
                    },
                    date: new Date(
                        res.data.daily.time[0].slice(0, 4),
                        res.data.daily.time[0].slice(6, 7) - 1,
                        res.data.daily.time[0].slice(9, 10)
                    ),
                })
            );
    }, []);

    return (
        <div>
            <h1>
                {forecast?.date.toLocaleString("ru", {
                    month: "long",
                    day: "numeric",
                })}
            </h1>
            <h2>{forecast?.date.toLocaleString("ru", { weekday: "long" })}</h2>
            <ul>
                <li>
                    Температура
                    <ul>
                        <li>минимальная {forecast?.temperature.min}°C</li>
                        <li>максимальная {forecast?.temperature.max}°C</li>
                    </ul>
                </li>
                <li>
                    Осадки
                    <ul>
                        <li>вероятность {forecast?.precip.sum}%</li>
                        {forecast?.precip.sum !== 0 ? (
                            <li>
                                длительность {forecast?.precip.duration} часов
                            </li>
                        ) : (
                            <></>
                        )}
                    </ul>
                </li>
                <li>
                    Ветер
                    <ul>
                        <li>скорость {forecast?.wind.speed}км/ч</li>
                        <li>направление {forecast?.wind.direction}°</li>
                    </ul>
                </li>
                <li>
                    солнце
                    <ul>
                        <li>восход {forecast?.sun.sunrise}</li>
                        <li>закат {forecast?.sun.sunset}</li>
                        <li>uv {Math.round(forecast?.sun.uv)}</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default App;
