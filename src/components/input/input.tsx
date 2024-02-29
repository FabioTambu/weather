import './input.scss'
import {Button, Divider, TextField} from "@mui/material";
import React, {useState} from "react";

interface IInput {
    onClick?: (inputValue: string, showInput: boolean, lat: number, lon: number) => void;
}

const Input = (props: IInput) => {

    const [inputValue, setInputValue] = useState<string>('')

    const [lat, setLat] = useState<number>(0);
    const [lon, setLon] = useState<number>(0);

    const [typeOfInput, setTypeOfInput] = useState<'city' | 'coordinates'>('city')

    const handleButtonClicked = () => {
        props.onClick!(inputValue, false, lat, lon);
    }

    return (
        <div className="input-container">
            <div className="input-container__how-to-search">
                <div className="input-container__how-to-search__case" onClick={() => {setTypeOfInput('city')}}>
                    <p>City</p>
                </div>
                <div className="input-container__how-to-search__case" onClick={() => {setTypeOfInput('coordinates')}}>
                    <p>Coordinates</p>
                </div>
            </div>
            { typeOfInput == 'city' ?
                <>
                    <h1>Inserisci il nome della tua città</h1>
                    <TextField
                        id="city-name"
                        label="Enter the city name"
                        variant="outlined"
                        value={inputValue}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setInputValue(event.target.value)}}
                    />
                </> :
                <>
                    <h1>Inserisci le coordinate</h1>
                    <TextField
                        id="lat"
                        label="Enter the latitude"
                        variant="outlined"
                        value={lat}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setLat(parseFloat(event.target.value))
                        }}
                    />
                    <TextField
                        id="lon"
                        label="Enter the longitude"
                        variant="outlined"
                        value={lon}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setLon(parseFloat(event.target.value))
                        }}
                    />
                </>
            }
            <Button variant="outlined" onClick={() => {
                handleButtonClicked()
            }}>Invia</Button>
        </div>
    )
}

export {Input}