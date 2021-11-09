const {
    parseISO,
    addMinutes,
    formatDuration,
    differenceInSeconds,
    intervalToDuration,
    compareAsc,
    format
} = require('date-fns');

const secondsDifference = (datetimeStr) => differenceInSeconds(new Date(), parseISO(datetimeStr));
const incrementByMins = (minutes) => addMinutes(new Date(), minutes);
const humanReadable = (datetimeStr) => {
    const duration = intervalToDuration({
        start: parseISO(datetimeStr),
        end: new Date(),
    })
    return formatDuration(duration);
}

const isPast = (datetimeStr) => {
    const result = compareAsc(parseISO(datetimeStr), new Date());
    if (result < 1) return true;
    return false;
}

const formatDateTime = (datetime) => format(datetime, 'MM/dd/yyyy H:m:s');


module.exports = {
    secondsDifference,
    incrementByMins,
    humanReadable,
    isPast,
    formatDateTime
}