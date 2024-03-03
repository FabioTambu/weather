import Image from "next/image";
import {useEffect, useState} from "react";

interface IWeatherIcon {
    weather: string
}

const WeatherIcon = (props: IWeatherIcon) => {
    const [weatherIcon, setWeatherIcon] = useState<string>()

    useEffect(() => {
        if(props.weather == '03d' || props.weather == '03n' || props.weather == '04d' || props.weather == '04n') {
            setWeatherIcon('03');
        } else if (props.weather == '09d' || props.weather == '09n' || props.weather == '10d' || props.weather == '10n') {
            setWeatherIcon('04');
        } else if (props.weather == '11d' || props.weather == '11n') {
            setWeatherIcon('05');
        } else if (props.weather == '13d' || props.weather == '13n') {
            setWeatherIcon('06');
        } else if (props.weather == '50d' || props.weather == '50n') {
            setWeatherIcon('07');
        } else {
            setWeatherIcon(props.weather)
        }
    }, []);

    return (
        <Image unoptimized src={`icon/${weatherIcon}.png`} alt={'weather_image'} width={100} height={100}/>
    )
}

export { WeatherIcon }