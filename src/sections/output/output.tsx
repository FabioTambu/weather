import axios from "axios";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Loading} from "@/components/loading/loading";
import { WeatherIcon } from "@/components/weather_icon/weatherIcon";
import { CalculateTime } from "@/components/calculateTime/calculateTime";
import { DateFormatter } from "@/components/date_formatter/dateFormatter";
import { IHandleSearch, IWeatherData, weatherPayload} from "@/types/interfaces";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import './output.scss'

const appid = process.env.NEXT_PUBLIC_WEATHER_API_KEY;


const Output = (props: IHandleSearch & { onBackClicked: () => void }) => {

    const [data, setData] = useState<IWeatherData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [localTimezone, setLocalTimezone] = useState<number>(0);
    const [error, setError] = useState(false)
    const [slideToView, setSlideToView] = useState(0)

    useEffect(() => {
        let weatherPayload: weatherPayload = {params: {}}
        if (props.type == 'city')
            weatherPayload = {params: {'appid': appid, 'q': props.city, 'units': 'metric'}}
        if (props.type == 'coordinates')
            weatherPayload = {params: {'appid': appid, 'lat': props.lat, 'lon': props.lon, 'units': 'metric'}}

        fetchData(weatherPayload);

        if(window.innerWidth > 1000) {
            setSlideToView(4)
        } else if (window.innerWidth > 500) {
            setSlideToView(2)
        } else {
            setSlideToView(1)
        }
    }, []);

    const fetchData = (payload: weatherPayload) => {
        axios.get('https://api.openweathermap.org/data/2.5/forecast', payload)
            .then((res) => {
                setData(res.data);
                setLocalTimezone(res.data.city.timezone)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }

    return (
        <>
        {loading && <Loading/>}

            <div className='back-icon-container'>
                <IconButton color='inherit' onClick={() => props.onBackClicked()}>
                    <ArrowBackIcon/>
                </IconButton>
            </div>

            {error && <div className='error-container'><h1>Si é verificato un errore</h1></div>}

            {data != undefined &&

            <div className="output_container">
                <div className="output-container__present-content">
                    {data.city.name == '' ? <h1>Unknown City</h1> : <h1>{data.city.name}, {data.city.country}</h1>}

                    <h2 id="date">
                        {CalculateTime(data.list[0].dt_txt, localTimezone).substring(11) + ', '}
                        {DateFormatter(CalculateTime(data.list[0].dt_txt, localTimezone).substring(0, 10), 'long')}
                    </h2>
                    <WeatherIcon weather={data.list[0].weather[0].icon} size='large'/>
                    <h1>{Math.round(data.list[0].main.temp)}°</h1>
                </div>

                <div className="output-container__future-content">
                    <Swiper
                        slidesPerView={slideToView}
                        spaceBetween={30}
                        freeMode={true}
                        modules={[ FreeMode ]}
                        className="output-container__future-content__swiper"
                    >
                        {data.list.map((item, index) => (
                            index != 0 &&
                            <SwiperSlide key={index}>
                                <div className="output-container__future-content__swiper__slide">
                                    <p>{CalculateTime(item.dt_txt, localTimezone).substring(11)}</p>
                                    <p id="date">{DateFormatter(CalculateTime(item.dt_txt, localTimezone).substring(0, 10), 'short')}</p>
                                    <WeatherIcon weather={item.weather[0].icon} size='small'/>
                                    <p>{Math.round(item.main.temp)}°</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            }
        </>
    )
}

export {Output}