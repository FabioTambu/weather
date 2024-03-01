import {useEffect, useState} from "react";
import axios from "axios";
import {Loading} from "@/components/loading/loading";
import Image from "next/image";

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
                temp: number,
                temp_min: number,
                temp_max: number
            }
            weather: [
                { main: string }
            ]
        }
    ];
}

const Output = (props: IOutput) => {

    const appid = '291cfcdeb83a7cd48d71fb3a81c85f96'

    const [data, setData] = useState<IWeatherData>();
    const [loading, setLoading] = useState<boolean>(true);

    let axiosConfig = {};

    if(props.city != null && props.city != ''){
        axiosConfig = {
            params: {'appid': appid, 'q': props.city}
        }
    } else {
        axiosConfig = {
            params: {'appid': appid, 'lat': props.lat, 'lon': props.lon}
        }
    }

    console.log(axiosConfig)

    const fetchData = () => {
        axios.get('http://api.openweathermap.org/data/2.5/forecast', axiosConfig)
            .then((res) => {console.log(res.data); setData(res.data); setLoading(false)})
            .catch((err) => console.log(err));

    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleBackClick = () => {
        props.onBackClicked!(true)
    }

    return(
        <div>
            {loading && <Loading/>}
            {data != undefined &&
                <div>
                    <div>
                        <h1 onClick={() => {handleBackClick()}}>Back</h1>
                    </div>
                    <div>
                        <Image unoptimized src={'icon/sun.png'} alt={'weather_image'} width={100} height={100} />
                        <p>Città: {data.city.name}</p>
                        <p>Stato: {data.city.country}</p>
                        <p>Lon: {data.city.coord.lon}</p>
                        <p>Lat: {data.city.coord.lat}</p>
                        <p>Orario: {data.list[0].dt_txt}</p>
                        <p>Tempo: {data.list[0].weather[0].main}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export { Output }