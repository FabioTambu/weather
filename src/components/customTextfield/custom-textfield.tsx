import {TextField} from "@mui/material";
import React from "react";
import {ICustomTextField} from "@/types/interfaces";



const CustomTextField = (props: ICustomTextField) => {

    return (
        <TextField
            id={props.id}
            label={props.label}
            variant="outlined"
            color="primary"
            type={props.type}
            value={props.value}
            error={props.error != undefined}
            helperText={props.error}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const tempValue = event.target.value;
                let tempError: string | undefined

                if(typeof props.value === 'number') {
                    if (parseFloat(tempValue) > props.maxNumberValue!) {
                        tempError = 'Numero Troppo Grande';
                    } else if (parseFloat(tempValue) < (props.maxNumberValue! * -1)) {
                        tempError = 'Numero Troppo Piccolo';
                    } else {
                        tempError = undefined;
                    }
                    props.onClick!({value: tempValue, errorValue: tempError})
                } else {
                    props.onClick({value: tempValue})
                }
            }}
        />
    )
}

export { CustomTextField }