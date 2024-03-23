import Image from "next/image";
import {useEffect, useState} from "react";
import {IWeatherIcon} from "@/types/interfaces";

const WeatherIcon = (props: IWeatherIcon) => {
    const [weatherIcon, setWeatherIcon] = useState<string>()
    const [imageDimension, setImageDimension] = useState<number>(0)

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

        if(props.size == 'large') {
            setImageDimension(130)
        } else {
            setImageDimension(40)
        }
    }, [props.weather, props.size]);



    return (
        <Image unoptimized src={`icon/${weatherIcon}.png`} alt={'weather_image'} width={imageDimension} height={imageDimension}/>
    )
}

export { WeatherIcon }