import {format} from 'date-fns';

const DateFormatter = (date: string, type: 'long' | 'short') => {

    if (type == 'long') {
        return date != '' && format(new Date(date), 'EE d MMMM')
    } else {
        return date != '' && format(new Date(date), 'EE d')
    }

}

export { DateFormatter }