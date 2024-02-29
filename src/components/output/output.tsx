import {useEffect} from "react";

interface IOutput {
    dataFetched?: (dataUploaded: boolean) => void;
}


const Output = (props: IOutput) => {

    const onDataFetched = () => {
        props.dataFetched!(true)
    }

    useEffect(() => {
        onDataFetched()
    }, []);

    return(
        <></>
    )
}

export { Output }