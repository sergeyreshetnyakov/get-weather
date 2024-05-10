/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect } from "react";

export const useFetchApi = (getLocation, createForecast, callback) => {
    useEffect(() => {
        getLocation()
            .then((coords) =>
                axios(
                    "https://api.open-meteo.com/v1/forecast?latitude=" +
                        coords.latitude +
                        "&longitude=" +
                        coords.longitude +
                        "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,wind_speed_10m_max,wind_direction_10m_dominant&forecast_days=7"
                )
                .then((res) => callback(createForecast(res.data.daily)))
            )
    }, []);
};
