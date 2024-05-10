/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCreateForecast, type IForecast } from "./hooks/useCreateForecast";
import { useGetLocation } from "./hooks/useGetLocation";
import { useFetchApi } from "./hooks/useFetchApi";
import { useState } from "react";

import {
    Cloud,
    Thermometer,
    Wind,
    Sun,
    Sunrise,
    Sunset,
    Loader,
} from "react-feather";

import Date from "./components/Date";
import StatusCard from "./components/StatusCard";

const App = () => {
    const [forecast, setForecast] = useState<IForecast | undefined>();
    const [day, setDay] = useState(0);

    const handleNext = () => {
        if (day !== 6) setDay(day + 1);
        else setDay(0);
    };
    const handlePrevious = () => {
        if (day !== 0) setDay(day - 1);
        else setDay(6);
    };

    useFetchApi(useGetLocation, useCreateForecast, setForecast);

    return (
        <div className="min-h-screen pb-8 bg-gradient-to-t from-sky-500 to-sky-700">
            <Date
                date={forecast?.date[day].toLocaleString("ru", {
                    month: "long",
                    day: "numeric",
                })}
                weekday={forecast?.date[day].toLocaleString("ru", {
                    weekday: "long",
                })}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
            />
            <div className="grid gap-2 m-auto grid-cols-1 max-w-[70%] sm:max-w-xl md:grid-cols-2 md:max-w-3xl">
                <StatusCard
                    name="Температура"
                    statName1="максимальная"
                    statName2="минимальная"
                    stat1={forecast?.temperature.max[day]}
                    stat2={forecast?.temperature.min[day]}
                    measure1="°C"
                    measure2="°C"
                    icon={
                        <Thermometer size={32} strokeWidth={2} color="#fff" />
                    }
                />
                <StatusCard
                    name="Ветер"
                    statName1="скорость"
                    stat1={forecast?.wind.speed[day]}
                    measure1="м/ч"
                    statName2="направление"
                    stat2={forecast?.wind.direction[day]}
                    measure2="°"
                    icon={<Wind size={32} strokeWidth={2} color="#fff" />}
                />
                <StatusCard
                    name="Солнце"
                    statName1={<Sunrise />}
                    stat1={forecast?.sun.sunrise[day]}
                    measure1=" ч."
                    statName2={<Sunset />}
                    stat2={forecast?.sun.sunset[day]}
                    measure2=" ч."
                    icon={<Sun size={32} strokeWidth={2} color="#fff" />}
                />

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                    <StatusCard
                        name="UV"
                        statName1="индекc"
                        stat1={forecast?.sun.uv[day]}
                        icon={<Loader size={32} strokeWidth={2} color="#fff" />}
                    />
                    <StatusCard
                        name="Осадки"
                        statName1="вероятность"
                        stat1={forecast?.precip.sum[day]}
                        measure1="%"
                        icon={<Cloud size={32} strokeWidth={2} color="#fff" />}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
