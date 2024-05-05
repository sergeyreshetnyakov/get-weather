/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCreateForecast, type IForecast } from "./hooks/useCreateForecast";
import { useGetLocation } from "./hooks/useGetLocation";
import { useFetchApi } from "./hooks/useFetchApi";
import { useState } from "react";

import Date from "./components/Date";

const App = () => {
    const [forecast, setForecast] = useState<IForecast | undefined>();
    const [ day, setDay ] = useState(0)

    const handleNext = () => {
        if(day !== 6) setDay(day + 1)
        else setDay(0)
    }
    const handlePrevious = () => {
        if(day !== 0) setDay(day - 1)
        else setDay(6)
    }

    useFetchApi(useGetLocation, useCreateForecast, setForecast)

    // <h1>
    // {forecast?.date[day].toLocaleString("ru", {
    //     month: "long",
    //     day: "numeric",
    // })}
    // </h1>
    // <h2>{forecast?.date[day].toLocaleString("ru", { weekday: "long" })}</h2>
    return (
        <div className="bg-black">
            <Date
                date={forecast?.date[day].toLocaleString("ru", {
                    month: "long",day: "numeric"
                })}
                weekday={forecast?.date[day].toLocaleString("ru", { weekday: "long" })}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                />
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
        </div>
    );
};

export default App;
