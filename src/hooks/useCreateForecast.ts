/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IForecast {
    temperature: {
        max: number[];
        min: number[];
    };
    precip: {
        duration: number[];
        sum: number[];
    };
    wind: {
        direction: number[];
        speed: number[];
    };
    sun: {
        sunrise: any[];
        sunset: any[];
        uv: number[];
    };
    date: any;
}

export const useCreateForecast = (data: any) => {
    const forecast: IForecast = {
        temperature: {
            max: data.temperature_2m_max,
            min: data.temperature_2m_min,
        },
        precip: {
            duration: data.precipitation_hours,
            sum: data.precipitation_sum,
        },
        wind: {
            direction: data.wind_speed_10m_max,
            speed: data.wind_direction_10m_dominant,
        },
        sun: {
            sunrise: data.sunrise,
            sunset: data.sunset,
            uv: data.uv_index_max,
        },
        date: data.time,
    };

    let dates: any[] = [];
    let sunrises: string[] = [];
    let sunsets: string[] = [];

    forecast.date.map((e: any) => {
        dates.push(new Date(e.slice(0, 4), e.slice(5, 7) - 1, e.slice(8, 10)));
    });

    forecast.sun.sunrise.map((e) => sunrises.push(e.slice(-5)));
    forecast.sun.sunset.map((e) => sunsets.push(e.slice(-5)));

    forecast.date = dates;
    forecast.sun.sunrise = sunrises;
    forecast.sun.sunset = sunsets;

    console.log(forecast?.sun.sunrise[0].slice(-5));

    return forecast;
};
