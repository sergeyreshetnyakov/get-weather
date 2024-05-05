/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IForecast {
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

export const useCreateForecast = (data) => {
    const forecast: IForecast = {
        temperature: {
            max: data.temperature_2m_max[0],
            min: data.temperature_2m_min[0],
        },
        precip: {
            duration: data.precipitation_hours[0],
            sum: data.precipitation_sum[0],
        },
        wind: {
            direction: data.wind_speed_10m_max[0],
            speed: data.wind_direction_10m_dominant[0],
        },
        sun: {
            sunrise: data.sunrise[0].slice(-5),
            sunset: data.sunset[0].slice(-5),
            uv: data.uv_index_max[0],
        },
        date: new Date(
            data.time[0].slice(0, 4),
            data.time[0].slice(6, 7) - 1,
            data.time[0].slice(9, 10)
        ),
    };
    return forecast;
};
