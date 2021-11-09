
import {
    format, 
    parseISO,
    intervalToDuration,
    formatDuration,
} from "date-fns";

const formattedTime = (datetimeStr: string): string => {
    return format(new Date(), 'MM/dd/yyyy H:m:s')
}

const timePast = (datetimeStr: string): string => {
    const duration = intervalToDuration({
        start: parseISO(datetimeStr),
        end: new Date(),
    });
    return formatDuration(duration);
};

export {
    formattedTime,
    timePast
}