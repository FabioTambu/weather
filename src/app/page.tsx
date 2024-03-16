"use client"
import './page.scss'
import {useState} from "react";
import {Input} from "@/sections/input/input";
import {Output} from "@/sections/output/output";
import {IHandleSearch, TSearchType} from "@/types/interfaces";
import {Info} from "@/sections/info/info";

export default function Home() {

    const [city, setCity] = useState<string | undefined>(undefined);
    const [contentToShow, setContentToShow] = useState<'input' | 'output' | 'info'>('input');
    const [lon, setLon] = useState<number | undefined>(undefined);
    const [lat, setLat] = useState<number | undefined>(undefined);
    const [searchType, setSearchType] = useState<TSearchType>('city')

    const handleInputChange = ({city, lon, lat, type}: IHandleSearch) => {
        setCity(city);
        setContentToShow('output');
        setLat(lat);
        setLon(lon);
        setSearchType(type);
        console.log(contentToShow)
    }

    const changeContentToShow = (content: 'input' | 'output' | 'info') => {
        setContentToShow(content)
    }

    return (
        <div className="app-container">
            <div className="app-container__content">
                {contentToShow == 'input' && <Input onSendClick={handleInputChange} onInfoClick={() => changeContentToShow('info')}/>}
                {contentToShow == 'output' && <Output onBackClicked={() => changeContentToShow('input')} city={city} lat={lat} lon={lon} type={searchType}/>}
                {contentToShow == 'info' && <Info onBackClick={() => changeContentToShow('input')}/>}
            </div>
        </div>
    );
}
