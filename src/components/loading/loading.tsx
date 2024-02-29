import {CircularProgress} from "@mui/material";
import './loading.scss'

const Loading = () => {
    return (
        <div className="loading-container">
            <CircularProgress />
        </div>
    )
}

export { Loading }