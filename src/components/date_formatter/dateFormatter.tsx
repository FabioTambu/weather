import { format } from 'date-fns';
import './date_formatter.scss'

interface IDateFormatter {
    date: string,
    time: string
}

const DateFormatter = (props: IDateFormatter) => {

    const formattedDate = props.date != '' && format(new Date(props.date), 'EE d MMMM')

    const localTime = `${Math.ceil(parseInt(props.time) / 3) * 3}:00`

    return (
        <h2>{localTime}, {formattedDate}</h2>
    )
}

export { DateFormatter }