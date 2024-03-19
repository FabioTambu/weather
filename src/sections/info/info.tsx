import {IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import './info.scss'

const Info = ({onBackClick}: {onBackClick: () => void}) => {

    return (
        <>
            <div className='back-icon-container'>
                <IconButton color='inherit' onClick={() => onBackClick()}>
                    <ArrowBackIcon fontSize='small'/>
                </IconButton>
            </div>

            <div className='info-container'>
                <div className='info-container__title'>
                    <h1>INFO</h1>
                </div>
                <div className='info-container__content'>
                    <h3>Created by: Fabio Tamburini</h3>
                    <h3>View this project on <a target='_blank' href='https://github.com/FabioTambu/weather'>Github</a></h3>
                    <h3>This website was created in React, Next (Typescript)</h3>
                    <h3>API used: <a target='_blank' href='https://openweathermap.org/'>Weather</a>, <a target='_blank' href='https://timezonedb.com/'>Timezone</a></h3>
                    <h3>My website: <a target='_blank' href='https://fabio.tamburini.dev'>Portfolio</a></h3>
                </div>
            </div>
        </>
    )
}

export { Info }