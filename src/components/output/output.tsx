import {useEffect, useState} from "react";
import axios from "axios";
import {Loading} from "@/components/loading/loading";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './output.scss'
import {DateFormatter} from "@/components/date_formatter/dateFormatter";
import {WeatherIcon} from "@/components/weather_icon/weatherIcon";
import {add} from "date-fns";

interface IOutput {
    lat?: number;
    lon?: number;
    city?: string;
    onBackClicked?: (showInput: boolean) => void;
}

interface IWeatherData {
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

const Output = (props: IOutput) => {

    const appid = '291cfcdeb83a7cd48d71fb3a81c85f96'

    const [fetchError, setFetchError] = useState<string>('')

    const [data, setData] = useState<IWeatherData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [localDate, setLocalDate] = useState<string>('');

    let openWeatherMapConfig = {};

    if(props.city != null && props.city != ''){
        openWeatherMapConfig = {
            params: {'appid': appid, 'q': props.city, 'units': 'metric'}
        }
    } else {
        openWeatherMapConfig = {
            params: {'appid': appid, 'lat': props.lat, 'lon': props.lon, 'units': 'metric'}
        }
    }

    const fetchData = () => {
        axios.get('https://api.openweathermap.org/data/2.5/forecast', openWeatherMapConfig)
            .then((res) => {
                setData(res.data);
            }).catch((err) => {
                console.log(err.message);
                setFetchError(err.message);
                setLoading(false);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(data) {
            const timeZoneDBConfig = {
                params: {
                    'key': 'D3UTJS4RD6K1',
                    'format': 'json',
                    'by': 'position',
                    'fields': 'formatted',
                    'lat': data.city.coord.lat,
                    'lng': data.city.coord.lon
                }
            }

            axios.get('https://api.timezonedb.com/v2.1/get-time-zone', timeZoneDBConfig).then((res) => {
                console.log(res.data.formatted)

                const fetchedLocalDate = res.data.formatted.slice(0, -6);

                let tempLocalTime = Math.ceil(parseInt(fetchedLocalDate.substring(11)) / 3) * 3;

                let tempLocalDate = fetchedLocalDate.substring(0, 10)

                if(tempLocalTime == 0) {
                    tempLocalTime = 3;
                } else if(tempLocalTime == 24) {
                    tempLocalTime = 0;
                    const newDate = add(new Date(tempLocalDate), { days: 1 });
                    tempLocalDate = newDate.toISOString().split('T')[0];
                }
                setLocalDate(tempLocalDate + ' ' + tempLocalTime);

            })
        }
    }, [data]);

    const handleBackClick = () => {
        props.onBackClicked!(true)
    }

    useEffect(() => {
        if(localDate != '') {
            setLoading(false);
        }
    }, [localDate]);

    return(

        <div className="output-component">
            {loading && <Loading/>}
                <>
                    <ArrowBackIcon onClick={() => {handleBackClick()}}/>
                    {
                        fetchError != '' ? <div className="error-container"><h1>Errore:</h1><h3>{fetchError}</h3></div> :

                            data != undefined &&

                                <div className="output-component__content">
                                    <div className="output-container">
                                        <div className="output-container__city-name">
                                            {data.city.name == '' ? <h1>Unknown City</h1> :
                                                <h1>{data.city.name}, {data.city.country}</h1>}
                                        </div>
                                        <div className="output-container__date">
                                            <DateFormatter date={localDate!.substring(0, 10)} time={localDate!.substring(11, 13)}/>
                                        </div>
                                        <div className="output-container__weather">
                                            <WeatherIcon weather={data.list[0].weather[0].icon}/>
                                            <h1>{Math.round(data.list[0].main.temp)}°</h1>
                                        </div>

                                    </div>
                                </div>

                    }
                </>
        </div>
    )
}

export {Output}