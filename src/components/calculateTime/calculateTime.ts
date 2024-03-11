import {addSeconds, format, parse} from "date-fns";

const CalculateTime = (date: string, localTimezone: number) => {
    const tempDate = parse(date, 'yyyy-MM-dd HH:mm:ss', new Date())

    return (format(addSeconds(tempDate, localTimezone), 'MM-dd-yyyy HH:mm'));
}

export { CalculateTime }