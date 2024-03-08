import dayjs from "dayjs";


export function calculateDiff(timeInMS) {
    const timeStampDayjs = dayjs(timeInMS);
    const nowDayjs = dayjs();

    if (timeStampDayjs.isBefore(nowDayjs)) {
        return {
            seconds: "00",
            minutes: "00",
            hours: "00",
            days: "00",
        };

    }
    return {
        seconds: getRemainingSeconds(nowDayjs, timeStampDayjs),
        minutes: getRemainingMinutes(nowDayjs, timeStampDayjs),
        hours: getRemainingHours(nowDayjs, timeStampDayjs),
        days: getRemainingDays(nowDayjs, timeStampDayjs),
    };
}

function getRemainingSeconds(nowDayjs, timeStampDayjs) {
    const seconds = timeStampDayjs.diff(nowDayjs, "seconds") % 60;
    return padWithZeroes(seconds, 2);
}
function getRemainingMinutes(nowDayjs, timeStampDayjs) {
    const minutes = timeStampDayjs.diff(nowDayjs, "minutes") % 60;
    return padWithZeroes(minutes, 2);
}
function getRemainingHours(nowDayjs, timeStampDayjs) {
    const hours = timeStampDayjs.diff(nowDayjs, "hours") % 60;
    return padWithZeroes(hours, 2);
}
function getRemainingDays(nowDayjs, timeStampDayjs) {
    const days = timeStampDayjs.diff(nowDayjs, "days") % 60;
    return days.toString();
}

function padWithZeroes(number, length) {
    const numberString = number.toString();
    if (numberString.length >= length) return numberString;
    return "0".repeat(length - numberString.length) + numberString;
}