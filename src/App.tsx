/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateForecast, type IForecast } from "./hooks/useCreateForecast";
import { useState } from "react";
import { useGetLocation } from "./hooks/useGetLocation";
import { useFetchApi } from "./hooks/useFetchApi";

const App = () => {
    const [forecast, setForecast] = useState<IForecast | undefined>();
    const [day, setDay] = useState<number>(0)

    useFetchApi(useGetLocation, useCreateForecast, setForecast)
    
    return (
        <div>
            <h1>
                {forecast?.date[day].toLocaleString("ru", {
                    month: "long",
                    day: "numeric",
                })}
            </h1>
            <h2>{forecast?.date[day].toLocaleString("ru", { weekday: "long" })}</h2>
            <ul>
                <li>
                    Температура
                    <ul>
                        <li>минимальная {forecast?.temperature.min[day]}°C</li>
                        <li>максимальная {forecast?.temperature.max[day]}°C</li>
                    </ul>
                </li>
                <li>
                    Осадки
                    <ul>
                        <li>вероятность {forecast?.precip.sum[day]}%</li>
                        {forecast?.precip.sum[day] !== 0 ? (
                            <li>
                                длительность {forecast?.precip.duration[day]} часов
                            </li>
                        ) : (
                            <></>
                        )}
                    </ul>
                </li>
                <li>
                    Ветер
                    <ul>
                        <li>скорость {forecast?.wind.speed[day]}км/ч</li>
                        <li>направление {forecast?.wind.direction[day]}°</li>
                    </ul>
                </li>
                <li>
                    солнце
                    <ul>
                        <li>восход {forecast?.sun.sunrise[day]}</li>
                        <li>закат {forecast?.sun.sunset[day]}</li>
                        <li>
                            uv{" "}
                            {forecast?.sun.uv !== undefined ? (
                                Math.round(forecast?.sun.uv[day])
                            ) : (
                                <></>
                            )}
                        </li>
                    </ul>
                </li>
            </ul>
            <button onClick={() => setDay(day - 1)}>previous</button>
            <button onClick={() => setDay(day + 1)}>next</button>
        </div>
    );
};

export default App;
