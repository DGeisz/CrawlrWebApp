
/**This takes in a number, and outputs the number in a 3-4 character format, like 3.4k, or 1.2m*/
export const toRep = (val) => {
    val = val + '';
    if (val < 1000) {
        return val;
    } else if (val < 100000) {
        return (val / 1000).toFixed(1) + 'k';
    } else if (val < 1000000) {
        return (val / 1000).toFixed(0) + 'k';
    }
    return (val / 1000000).toFixed(1) + 'm';
};

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];

/**
 * This takes in epoch time, and formats it in a short concise time or date, depending
 * on how long ago timestamp was*/
export const dateFormatter = (epochTime) => {
    const date = new Date(epochTime);
    const diff = Date.now() - epochTime;
    const diffDays = diff / (1000 * 3600 * 24 * 7);
    if (diffDays < 6) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        if (diffDays < 1) {
            return hours + ':' + minutes + ' ' + ampm;
        }
        return days[date.getDay()] + ', ' + hours + ':' + minutes + ' ' + ampm
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${year}`;
};

