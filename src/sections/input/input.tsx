import './input.scss'
import { Button, IconButton, Skeleton } from "@mui/material";
import React, {useEffect, useState} from "react";
import {IHandleSearch, TSearchType} from "@/types/interfaces";
import InfoIcon from '@mui/icons-material/Info';
import { CustomTextField } from "@/components/customTextfield/custom-textfield";
import {Loading} from "@/components/loading/loading";

const Input = ({onSendClick, onInfoClick}: { onSendClick: (props: IHandleSearch) => void; onInfoClick: () => void }) => {

    const [value, setValue] = useState({city: '', lat: '', lon: ''})

    const [error, setError] =
        useState<{city: string | undefined, lat: string | undefined, lon: string | undefined}>({city: undefined, lat: undefined, lon: undefined})

    const [howToSearch, setHowToSearch] = useState<TSearchType>('city');
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const handleButtonClicked = () => {
        if(value.city == '' && howToSearch == 'city') {
            setError(prevLocation => ({...prevLocation,
                city: 'The field cannot be empty'
            }))
        } else {
            setError(prevLocation => ({...prevLocation, city: undefined}))

            if (value.lat == '' || value.lon == '') {

                if (value.lat == '')
                    setError(prevLocation => ({...prevLocation, lat: 'The field cannot be empty'}));

                if (value.lon == '')
                    setError(prevLocation => ({...prevLocation, lon: 'The field cannot be empty'}));

                return;
            }

            if (error.lat == undefined && error.lon == undefined) {
                onSendClick!({value: value, type: howToSearch});
            }
        }
    }

    const handleChangeHowToSearch = (typeOfSearch: 'city' | 'coordinates') => {
        setHowToSearch(typeOfSearch);
        setValue({city: '', lat: '', lon: ''})
        setError({city: undefined, lat: undefined, lon: undefined})
    }

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        const initializeScreenWidth = () => {
            setScreenWidth(window.innerWidth);
            setTimeout(() => {
                setLoading(false);
            }, 500)

        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            initializeScreenWidth();
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    return (
        <>
        {loading ?
            <div className='input-loading'>
                <div className='input-loading__how-to-search'>
                    <Skeleton variant="rounded" width={70} height={40} sx={{marginRight: '30px'}} animation={"wave"}/>
                    <Skeleton variant="rounded" width={120} height={40} animation={"wave"}/>
                </div>
                <div className='input-loading__title'>
                    <Skeleton variant="text" sx={{fontSize: '80px'}} width={'60%'} animation={"wave"}/>
                </div>
                <Skeleton variant="rounded" width={'50%'} height={50} animation={"wave"}/>
                <div className='input-loading__search-button'>
                    <Skeleton variant="rounded" width={90} height={35} animation={"wave"}/>
                </div>
            </div> :

            <>
                <div className='info-icon'>
                    <IconButton color='primary' onClick={() => {
                        onInfoClick();
                    }}>
                        <InfoIcon fontSize='small'/>
                        </IconButton>
                    </div>
                    <div className="input-container">
                        <div className="input-container__how-to-search">
                            <div className="input-container__how-to-search__case" onClick={() => {
                                handleChangeHowToSearch('city');
                            }}>
                                <Button
                                    color='success'
                                    variant={howToSearch == 'city' ? "contained" : "outlined"}
                                    size={screenWidth > 400 ? 'medium' : 'small'}
                                >
                                    City
                                </Button>
                            </div>
                            <div className="input-container__how-to-search__case" onClick={() => {
                                handleChangeHowToSearch('coordinates');
                            }}>
                                <Button
                                    color="success"
                                    variant={howToSearch == 'coordinates' ? "contained" : "outlined"}
                                    size={screenWidth > 400 ? 'medium' : 'small'}
                                >
                                    {screenWidth > 600 ? 'Coordinates' : 'Coord'}
                                </Button>
                            </div>
                        </div>
                        <div className="input-container__content">
                            {howToSearch == 'city' ?
                                <>
                                    <h1>Insert the city</h1>
                                    <CustomTextField
                                        id="city-name"
                                        label="Enter the city name"
                                        type="string"
                                        value={value.city}
                                        error={error.city}
                                        size={screenWidth > 450 ? 'medium' : 'small'}
                                        onChange={({value}) => {
                                            setValue(prevLocation => ({...prevLocation,
                                                city: value
                                            }))
                                        }}/>
                                </> :
                                <>
                                    <h1>Insert the coordinates</h1>
                                    <div className="textfield-container">
                                        <div className="textfield-container__content">
                                            <CustomTextField
                                                id="lat"
                                                label="Enter the latitude"
                                                type="number"
                                                value={value.lat}
                                                error={error.lat}
                                                maxNumberValue={90}
                                                size={screenWidth > 450 ? 'medium' : 'small'}
                                                onChange={({value, coordErrorValue}) => {
                                                    setValue(prevLocation => ({...prevLocation,
                                                        lat: value
                                                    }))
                                                    setError(prevLocation => ({...prevLocation,
                                                        lat: coordErrorValue
                                                    }))
                                                }}/>
                                        </div>
                                        <div className="textfield-container__content">
                                            <CustomTextField
                                                id="lon"
                                                label="Enter the longitude"
                                                type="number"
                                                value={value.lon}
                                                error={error.lon}
                                                maxNumberValue={180}
                                                size={screenWidth > 450 ? 'medium' : 'small'}
                                                onChange={({value, coordErrorValue}) => {
                                                    setValue(prevLocation => ({
                                                        ...prevLocation,
                                                        lon: value
                                                    }))
                                                    setError(prevLocation => ({
                                                        ...prevLocation,
                                                        lon: coordErrorValue
                                                    }))
                                                }}/>
                                        </div>
                                    </div>
                                </>}
                        </div>
                        <div className="search-button">
                            <Button variant="contained" onClick={() => {handleButtonClicked()}}>Search</Button>
                        </div>
                    </div>
                </>
        }
        </>
    )
}

export {Input}