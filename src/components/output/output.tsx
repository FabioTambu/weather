import {useEffect, useState} from "react";
import axios from "axios";
import {Loading} from "@/components/loading/loading";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './output.scss'
import {DateFormatter} from "@/components/date_formatter/dateFormatter";
import {WeatherIcon} from "@/components/weather_icon/weatherIcon";

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

    const [data, setData] = useState<IWeatherData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [localTime, setLocalTime] = useState<number>(0);

    let axiosConfig = {};

    if(props.city != null && props.city != ''){
        axiosConfig = {
            params: {'appid': appid, 'q': props.city, 'units': 'metric'}
        }
    } else {
        axiosConfig = {
            params: {'appid': appid, 'lat': props.lat, 'lon': props.lon, 'units': 'metric'}
        }
    }

    const fetchData = () => {
        axios.get('https://api.openweathermap.org/data/2.5/forecast', axiosConfig)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            }).catch((err) => console.log(err));

    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(data) {
            const timeZoneConfig = {
                params: {
                    'key': 'D3UTJS4RD6K1',
                    'format': 'json',
                    'by': 'position',
                    'lat': data!.city.coord.lat,
                    'lng': data!.city.coord.lon
                }
            }

            axios.get('https://api.timezonedb.com/v2.1/get-time-zone', timeZoneConfig)
                .then((res) => {
                    setLocalTime(Math.floor(parseInt(res.data.formatted.substring(11, 13)) / 3));

                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [data]);

    const handleBackClick = () => {
        props.onBackClicked!(true)
    }

    return(

        <div className="output-component">
            {loading && <Loading/>}
            {data != undefined &&
                <>
                    <div className="arrow-back-container">
                        <ArrowBackIcon onClick={() => {handleBackClick()}}/>
                    </div>
                    <div className="output-component__content">
                        <div className="output-container">
                            <div className="output-container__city-name">
                            {data.city.name == '' ? <h1>Unknown</h1> : <h1>{data.city.name}, {data.city.country}</h1>}
                            </div>
                            <div className="output-container__coord">
                                <div className="output-container__coord__lat">
                                    <span>Lon: {data.city.coord.lon.toFixed(2)}</span>
                                </div>
                                <span>Lat: {data.city.coord.lat.toFixed(2)}</span>
                            </div>
                            <div className="output-container__date">
                                <DateFormatter date={data.list[localTime].dt_txt.substring(0, 10)}/>
                                <p>{data.list[localTime].dt_txt.substring(11, 16)}</p>
                            </div>
                            <div className="output-container__weather">
                                <WeatherIcon weather={data.list[localTime].weather[0].icon}/>
                                <p>{data.list[localTime].weather[0].description}</p>
                                <h1>{Math.round(data.list[localTime].main.temp)}°</h1>
                            </div>

                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export {Output }