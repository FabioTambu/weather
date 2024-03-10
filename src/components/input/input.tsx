import './input.scss'
import {Button, Divider, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {IHandleSearch, TSearchType} from "@/types/interfaces";

const Input = ({onClick}: { onClick: (props: IHandleSearch) => void }) => {

    const [city, setCity] = useState<string>('')
    const [lat, setLat] = useState<number>(0);
    const [lon, setLon] = useState<number>(0);
    const [latError, setLatError] = useState<string | undefined>()
    const [lonError, setLonError] = useState<string | undefined>()

    const [howToSearch, setHowToSearch] = useState<TSearchType>('city')

    const handleButtonClicked = () => {
        if (latError == undefined && lonError == undefined) {
            console.log('Entrato')
            onClick!({city, lat, lon, type: howToSearch});
        }
    }

    const handleChangeHowToSearch = (typeOfSearch: 'city' | 'coordinates') => {
        setHowToSearch(typeOfSearch);
        setCity('');
        setLat(0);
        setLon(0);
    }

    return (
        <div className="input-container">
            <div className="input-container__how-to-search">
                <div className="input-container__how-to-search__case" onClick={() => {
                    handleChangeHowToSearch('city')
                }}>
                    <p>City</p>
                </div>
                <div className="input-container__how-to-search__case" onClick={() => {
                    handleChangeHowToSearch('coordinates')
                }}>
                    <p>Coordinates</p>
                </div>
            </div>
            <div className="input-container__content">
                {howToSearch == 'city' ?
                    <>
                        <h1>Inserisci la città</h1>
                        <TextField
                            id="city-name"
                            label="Enter the city name"
                            variant="outlined"
                            color="primary"
                            value={city}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setCity(event.target.value)
                            }}
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
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setLat(parseFloat(event.target.value));

                                        if (lat > 90) {
                                            setLatError('Numero Troppo Grande')
                                        } else if (lat < -90) {
                                            setLatError('Numero Troppo Piccolo')
                                        } else {
                                            setLatError(undefined)
                                        }
                                    }}
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
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setLon(parseFloat(event.target.value));
                                        if (lon > 180) {
                                            setLonError('Numero Troppo Grande')
                                        } else if (lon < -180) {
                                            setLonError('Numero Troppo Piccolo')
                                        } else {
                                            setLonError(undefined)
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className="send-button">
                <Button variant="outlined" onClick={() => {
                    handleButtonClicked()
                }}>Invia</Button>
            </div>
        </div>
    )
}

export {Input}