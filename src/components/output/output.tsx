import {useEffect, useState} from "react";
import axios from "axios";
import {Loading} from "@/components/loading/loading";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './output.scss'
import {DateFormatter} from "@/components/date_formatter/dateFormatter";
import {WeatherIcon} from "@/components/weather_icon/weatherIcon";
import {format} from "date-fns";
import {IHandleSearch, IWeatherData, weatherPayload} from "@/types/interfaces";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import {IconButton} from "@mui/material";

const appid = process.env.NEXT_PUBLIC_WEATHER_API_KEY;


const Output = (props: IHandleSearch & { onBackClicked?: (showInput: boolean) => void }) => {
    const [fetchError, setFetchError] = useState<string>('')
    const [data, setData] = useState<IWeatherData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [localDate, setLocalDate] = useState<string>('');

    useEffect(() => {
        let weatherPayload: weatherPayload = {params: {}}
        if (props.type == 'city')
            weatherPayload = {params: {'appid': appid, 'q': props.city, 'units': 'metric'}}
        if (props.type == 'coordinates')
            weatherPayload = {params: {'appid': appid, 'lat': props.lat, 'lon': props.lon, 'units': 'metric'}}

        fetchData(weatherPayload);
    }, []);

    const fetchData = (payload: weatherPayload) => {
        axios.get('https://api.openweathermap.org/data/2.5/forecast', payload)
            .then((res) => {
                setData(res.data);
                calculateLocalTime(res.data);
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.message);
                setFetchError(err.message);
                setLoading(false);
            });
    }

    const calculateLocalTime = (fetchedData: any) => {
        const tempDate = new Date(fetchedData.list[0].dt * 1000);
        setLocalDate(format(tempDate, 'MM-dd-yyyy HH:mm')); // TODO: Convertire orario da UTC a ora locale
    }

    const handleBackClick = () => {

        props.onBackClicked!(true);
    }

    return (

        // TODO: aggiungere il loading

        data != undefined &&

        <>
            <div className='icon-container'>
                <IconButton color='inherit' onClick={() => {handleBackClick()}}>
                    <ArrowBackIcon/>
                </IconButton>
            </div>

            <div className="output_container">
                <div className="output-container__present-content">
                    {data.city.name == '' ? <h1>Unknown City</h1> : <h1>{data.city.name}, {data.city.country}</h1>}
                    <DateFormatter date={localDate!.substring(0, 10)} time={localDate!.substring(11, 13)}/>
                    <WeatherIcon weather={data.list[0].weather[0].icon}/>
                    <h1>{Math.round(data.list[0].main.temp)}°</h1>
                </div>

                <div className="output-container__future-content">
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        freeMode={true}
                        modules={[FreeMode]}
                        className="output-container__future-content__swiper"
                    >
                        {//TODO: i SwiperSlide devono essere fatti con un data.map
                        }
                        <SwiperSlide>
                            <div className="output-container__future-content__swiper__slide">
                                <p>Prova 1</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="output-container__future-content__swiper__slide">
                                <p>Prova 2</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="output-container__future-content__swiper__slide">
                                <p>Prova 3</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="output-container__future-content__swiper__slide">
                                <p>Prova 4</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="output-container__future-content__swiper__slide">
                                <p>Prova 5</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="output-container__future-content__swiper__slide">
                                <p>Prova 6</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="output-container__future-content__swiper__slide">
                                <p>Prova 7</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="output-container__future-content__swiper__slide">
                                <p>Prova 8</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="output-container__future-content__swiper__slide">
                                <p>Prova 9</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export {Output}