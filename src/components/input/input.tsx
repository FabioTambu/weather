import './input.scss'
import {Button, Divider, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";

interface IInput {
    onClick?: (city: string, showInput: boolean, lat: string, lon: string) => void;
}

const Input = (props: IInput) => {

    const [city, setCity] = useState<string>('')

    const [lat, setLat] = useState<string>('');
    const [lon, setLon] = useState<string>('');
    const [latError, setLatError] = useState<string | undefined>()
    const [lonError, setLonError] = useState<string | undefined>()

    const [howToSearch, setHowToSearch] = useState<'city' | 'coordinates'>('city')

    const handleButtonClicked = () => {

        if(latError == undefined && lonError == undefined) {
            console.log('Entrato')
            props.onClick!(city, false, lat, lon);
        }

    }

    useEffect(() => {
        if(parseFloat(lat!) > 90) {
            setLatError('Latitudine Troppo Grande')
            console.log('Latitudine Troppo Grande')
        } else if (parseFloat(lat!) < -90) {
            setLatError('Latitudine Troppo Piccola')
            console.log('Latitudine Troppo Piccola')
        } else {
            setLatError(undefined)
        }
    }, [lat]);

    useEffect(() => {
        if(parseFloat(lon!) > 180) {
            setLonError('Longitudine Troppo Grande')
            console.log('Longitudine Troppo Grande')
        } else if (parseFloat(lon!) < -180) {
            setLonError('Longitudine Troppo Piccola')
            console.log('Longitudine Troppo Piccola')
        } else {
            setLonError(undefined)
        }
    }, [lon]);

    const handleChangeHowToSearch = (typeOfSearch: 'city' | 'coordinates') => {
        setHowToSearch(typeOfSearch);
        setCity('');
        setLat('');
        setLon('');
    }

    return (
        <div className="input-container">
            <div className="input-container__how-to-search">
                <div className="input-container__how-to-search__case" onClick={() => {handleChangeHowToSearch('city')}}>
                    <p>City</p>
                </div>
                <div className="input-container__how-to-search__case" onClick={() => {handleChangeHowToSearch('coordinates')}}>
                    <p>Coordinates</p>
                </div>
            </div>
            <div className="input-container__content">
                { howToSearch == 'city' ?
                    <>
                        <h1>Inserisci la città</h1>
                        <TextField
                            id="city-name"
                            label="Enter the city name"
                            variant="outlined"
                            color="primary"
                            value={city}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCity(event.target.value)}}
                        />
                    </> :
                    <>
                        <h1>Inserisci le coordinate</h1>
                        <div>
                            <div className="textfield-container">
                                <TextField
                                    id="lat"
                                    label="Enter the latitude"
                                    variant="outlined"
                                    color="primary"
                                    type="number"
                                    value={lat}
                                    error={latError != undefined}
                                    helperText={latError}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setLat(event.target.value)}}
                                />
                            </div>
                            <div className="textfield-container">
                                <TextField
                                    id="lon"
                                    label="Enter the longitude"
                                    variant="outlined"
                                    color="primary"
                                    type="number"
                                    value={lon}
                                    error={lonError != undefined}
                                    helperText={lonError}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setLon(event.target.value)}}
                                />
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className="send-button">
                <Button variant="outlined" onClick={() => {handleButtonClicked()}}>Invia</Button>
            </div>
        </div>
    )
}

export {Input}