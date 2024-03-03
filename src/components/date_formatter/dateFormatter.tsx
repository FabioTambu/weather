import { format } from 'date-fns';

interface IDateFormatter {
    date: string
}

const DateFormatter = (props: IDateFormatter) => {

    const formattedDate = format(new Date(props.date), 'EE d MMMM')

    return (
        <h2>{formattedDate}</h2>
    )
}

export { DateFormatter }