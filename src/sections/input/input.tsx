import './input.scss'
import { Button, IconButton } from "@mui/material";
import React, { useState} from "react";
import {IHandleSearch, TSearchType} from "@/types/interfaces";
import InfoIcon from '@mui/icons-material/Info';
import { CustomTextField } from "@/components/customTextfield/custom-textfield";

const Input = ({onSendClick, onInfoClick}: { onSendClick: (props: IHandleSearch) => void; onInfoClick: () => void }) => {

    const [city, setCity] = useState<string>('')
    const [lat, setLat] = useState<number>(0);
    const [lon, setLon] = useState<number>(0);
    const [latError, setLatError] = useState<string | undefined>()
    const [lonError, setLonError] = useState<string | undefined>()

    const [howToSearch, setHowToSearch] = useState<TSearchType>('city')

    const handleButtonClicked = () => {
        if (latError == undefined && lonError == undefined) {
            onSendClick!({city, lat, lon, type: howToSearch});
        }
    }

    const handleChangeHowToSearch = (typeOfSearch: 'city' | 'coordinates') => {
        setHowToSearch(typeOfSearch);
        setCity('');
        setLat(0);
        setLon(0);
    }

    return (
        <>
            <div className='info-icon'>
                <IconButton color='primary' onClick={() => {onInfoClick()}}>
                    <InfoIcon fontSize='small'/>
                </IconButton>
            </div>

            <div className="input-container">
                <div className="input-container__how-to-search">
                    <div className="input-container__how-to-search__case" onClick={() => {handleChangeHowToSearch('city')}}>
                        <Button color="success" variant={howToSearch == 'city' ? "contained" : "outlined"}>City</Button>
                    </div>
                    <div className="input-container__how-to-search__case" onClick={() => {handleChangeHowToSearch('coordinates')}}>
                        <Button color="success" variant={howToSearch == 'coordinates' ? "contained" : "outlined"}>Coordinates</Button>
                    </div>
                </div>
                <div className="input-container__content">
                    {howToSearch == 'city' ?
                        <>
                            <h1>Inserisci la città</h1>
                            <CustomTextField
                                id="city-name"
                                label="Enter the city name"
                                type="string"
                                value={city}
                                onClick={({value}) => {
                                    setCity(value);
                                }
                            }/>
                        </> :
                        <>
                            <h1>Inserisci le coordinate</h1>
                            <div>
                                <div className="textfield-container">
                                    <CustomTextField
                                        id="lat"
                                        label="Enter the latitude"
                                        type="number"
                                        value={lat}
                                        error={latError}
                                        maxNumberValue={90}
                                        onClick={({value, errorValue}) => {
                                            setLat(parseFloat(value));
                                            setLatError(errorValue)
                                        }}/>
                                </div>
                                <div className="textfield-container">
                                    <CustomTextField
                                        id="lon"
                                        label="Enter the longitude"
                                        type="number"
                                        value={lon}
                                        error={lonError}
                                        maxNumberValue={180}
                                        onClick={({value, errorValue}) => {
                                            setLon(parseFloat(value));
                                            setLonError(errorValue)
                                        }}/>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="send-button">
                    <Button variant="contained" onClick={() => {
                        handleButtonClicked()
                    }}>Invia</Button>
                </div>
            </div>
        </>
    )
}

export {Input}