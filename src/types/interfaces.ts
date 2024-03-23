/**
 * Output
 */

type WeatherParams = {
    appid: string;
    units: 'metric';
} & ({ lat: string; lon: string } | { q: string });

export interface weatherPayload {
    params: WeatherParams
}

export interface IWeatherData {
    city: {
        name: string,
        country: string,
        timezone: number,
        coord: {
            lat: number,
            lon: number
        }
    }
    list: [
        {
            dt_txt: string,
            main: {
                temp: number
            }
            weather: [{ icon: string }]
        }
    ];
}

export interface IWeatherIcon {
    weather: string,
    size: 'large' | 'small'
}

/**
 * Input
 */

export type TSearchType = 'city' | 'coordinates'

export interface ICustomTextField {
    id: string;
    label: string;
    type: 'number' | 'string';
    value: string | number;
    error: string | undefined;
    maxNumberValue?: number;
    size: 'small' | 'medium';
    onChange: (props: { value: string; coordErrorValue?: string | undefined}) => void
}

/**
 * Input & Output
 */

export interface IHandleSearch {
    value: {
        city?: string,
        lat?: string,
        lon?: string
    }
    type: TSearchType
}