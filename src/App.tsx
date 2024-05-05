/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateForecast, type IForecast } from "./hooks/useCreateForecast";
import { useState } from "react";
import { useGetLocation } from "./hooks/useGetLocation";
import { useFetchApi } from "./hooks/useFetchApi";

const App = () => {
    const [forecast, setForecast] = useState<IForecast | undefined>();

    useFetchApi(useGetLocation, useCreateForecast ,setForecast)
    
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
                        <li>
                            uv{" "}
                            {forecast?.sun.uv !== undefined ? (
                                Math.round(forecast?.sun.uv)
                            ) : (
                                <></>
                            )}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default App;
