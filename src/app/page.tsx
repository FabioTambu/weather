"use client"
import './page.scss'
import {useState} from "react";
import {Input} from "@/sections/input/input";
import {Output} from "@/sections/output/output";
import {IHandleSearch, TSearchType} from "@/types/interfaces";
import {Info} from "@/sections/info/info";
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Home() {

    const [city, setCity] = useState<string | undefined>(undefined);
    const [contentToShow, setContentToShow] = useState<'input' | 'output' | 'info'>('input');
    const [lon, setLon] = useState<string | undefined>(undefined);
    const [lat, setLat] = useState<string | undefined>(undefined);
    const [searchType, setSearchType] = useState<TSearchType>('city')

    const handleInputChange = ({value, type}: IHandleSearch) => {
        setCity(value.city);
        setContentToShow('output');
        setLat(value.lat);
        setLon(value.lon);
        setSearchType(type);
    }

    const changeContentToShow = (content: 'input' | 'output' | 'info') => {
        setContentToShow(content)
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="app-container">
                <div className="app-container__content">
                    {contentToShow == 'input' && <Input onSendClick={handleInputChange} onInfoClick={() => changeContentToShow('info')}/>}
                    {contentToShow == 'output' && <Output onBackClicked={() => changeContentToShow('input')} value={{city: city, lat: lat, lon: lon}} type={searchType}/>}
                    {contentToShow == 'info' && <Info onBackClick={() => changeContentToShow('input')}/>}
                </div>
            </div>
        </ThemeProvider>
    );
}
