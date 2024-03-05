"use client"
import './page.scss'
import {useState} from "react";
import {Input} from "@/components/input/input";
import {Output} from "@/components/output/output";
import {IHandleSearch, TSearchType} from "@/types/interfaces";

export default function Home() {

    const [city, setCity] = useState<string | undefined>(undefined);
    const [showInput, setShowInput] = useState<boolean>(true);
    const [lon, setLon] = useState<number | undefined>(undefined);
    const [lat, setLat] = useState<number | undefined>(undefined);
    const [searchType, setSearchType] = useState<TSearchType>('city')

    const handleInputChange = ({city, lon, lat, type}: IHandleSearch) => {
        setCity(city);
        setShowInput(false);
        setLat(lat);
        setLon(lon);
        setSearchType(type)
    }

    const handleOutputChange = (showInput: boolean) => {
        setShowInput(showInput)
    }

    return (
        <div className="app-container">
            <div className="app-container__content">
                {showInput ?
                    <Input onClick={handleInputChange}/> :
                    <Output onBackClicked={handleOutputChange} city={city} lat={lat} lon={lon} type={searchType}/>
                }
            </div>
        </div>
    );
}
