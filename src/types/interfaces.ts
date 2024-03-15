/**
 * Output
 */


export type TSearchType = 'city' | 'coordinates'


export interface weatherPayload {
    params: any // TODO: tipizza
}

export interface ICustomTextField {
    id: string;
    label: string;
    type: 'number' | 'string';
    value: string | number;
    error?: string | undefined;
    maxNumberValue?: number;
    onClick: (props: { value: string; errorValue?: string | undefined}) => void
}

export interface IHandleSearch {
    city?: string,
    lat?: number,
    lon?: number,
    type: TSearchType
}

export interface IWeatherIcon {
    weather: string,
    size: 'large' | 'small'
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
            weather: [
                {
                    main: string,
                    description: string,
                    icon: string
                }
            ]
        }
    ];
}

