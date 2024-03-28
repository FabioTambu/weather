import {TextField} from "@mui/material";
import React from "react";
import {ICustomTextField} from "@/types/interfaces";

const CustomTextField = (props: ICustomTextField) => {

    return (
        <TextField
            sx={{width: '80%', maxWidth: '300px', minWidth: '172px'}}
            size={props.size}
            id={props.id}
            label={props.label}
            variant="outlined"
            color="warning"
            type={props.type}
            value={props.value}
            error={props.error != undefined}
            helperText={props.error}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if(event.target.value != '') {
                    const tempValue = event.target.value;
                    let tempError: string | undefined

                    if(props.type === 'number') {
                        if (parseFloat(tempValue) > props.maxNumberValue!) {
                            tempError = 'Number Too Large';
                        } else if (parseFloat(tempValue) < (props.maxNumberValue! * -1)) {
                            tempError = 'Number Too Small';
                        } else if (tempValue == '') {
                            tempError = 'The field cannot be empty';
                        } else {
                            tempError = undefined;
                        }
                        props.onChange!({value: tempValue, coordErrorValue: tempError})
                    } else {
                        props.onChange({value: tempValue})
                    }
                }
            }}
        />
    )
}

export { CustomTextField }