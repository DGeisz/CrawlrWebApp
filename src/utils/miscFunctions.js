
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

const daysArray = [
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
        return daysArray[date.getDay()] + ', ' + hours + ':' + minutes + ' ' + ampm
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${year}`;
};

/**
 * Takes in a military block time i.e. '12:20;14:30' and
 * output the standard interval it represents, ie '12:20 PM - 2:30 PM
 */
function militaryBlockToStandardInterval(militaryBlock) {
    let standards = [];
    let blockSplit = militaryBlock.split(';');
    blockSplit.forEach((block, index) => {
        const milHours = parseInt(block.split(':')[0]);
        const hours = ((milHours + 11) % 12) + 1;
        let amPm = milHours > 11 ? ' PM' : ' AM';
        standards.push(hours + ':' + block.split(':')[1] + amPm);
    });
    return standards.join(' - ');
}

export function hoursToIntervals(hours) {
    if (hours[1] === '') {
        return militaryBlockToStandardInterval(hours[0]);
    } else {
        return hours.map(hour => militaryBlockToStandardInterval(hour)).join(', ');
    }
}

const days = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
};

/**
 * Takes in an array of days i.e. ['Mon', 'Tue', 'Wed']
 * and outputs a readable day interval, i.e. 'Mon - Wed'
 */
export function dayArrayToInternal(dayArray) {
    if (dayArray.length === 7) {
        return 'Sun - Sat';
    } else if (dayArray.length === 0) {
        return '';
    }
    dayArray.sort((a, b) => days[a] - days[b]);
    if (dayArray[0] === 'Sun' && dayArray[dayArray.length - 1] === 'Sat') {
        let index = dayArray.length - 1;
        while (true) {
            if (index <= 1 || days[dayArray[index - 1]] + 1 !== days[dayArray[index]]) {
                break;
            } else {
                index--;
            }
        }
        let firstPart = dayArray.slice(0, index);
        let secondPart = dayArray.slice(index);
        dayArray = secondPart.concat(firstPart);
    }
    let dayCluster = [[dayArray[0]]];
    let clusterIndex = 0;
    for (let i = 1; i < dayArray.length; i++){
        if ((days[dayArray[i - 1]] + 1) % 7 === days[dayArray[i]]) {
            dayCluster[clusterIndex].push(dayArray[i]);
        } else {
            dayCluster.push([dayArray[i]]);
            clusterIndex++;
        }
    }
    let finalInterval = '';
    dayCluster.forEach((cluster, index) => {
        if (cluster.length === 1) {
            finalInterval += cluster[0] + ', '
        } else if (cluster.length === 2) {
            finalInterval += cluster.join(', ') + ', ';
        } else {
            finalInterval += cluster[0] + ' - ' + cluster[cluster.length - 1] + ', ';
        }
        if (index === dayCluster.length - 1) {
            finalInterval = finalInterval.substring(0, finalInterval.length - 2);
        }
    });
    return finalInterval;
}

/**
 * Converts the html datetime-local input to a readable string
 */
export function dateTimeToReadable(dateTime) {
    let split = dateTime.split('T');
    let milTime = split[1];
    const milHours = parseInt(milTime.split(':')[0]);
    const hours = ((milHours + 11) % 12) + 1;
    let amPm = milHours > 11 ? ' PM' : ' AM';
    let finalString = hours + ':' + milTime.split(':')[1] + amPm + ', ';
    let dateSplit = split[0].split('-');
    let month = dateSplit[1][0] === '0' ? dateSplit[1].substr(1) : dateSplit[1];
    finalString += month + '/' + dateSplit[2] + '/' + dateSplit[0];
    return finalString;
}

/**
 * Takes in a dates string and determines if today is a day represented by the string
 *
 * A dates string is formatted as follows: For all days of week that the promo is set to repeat
 * You separate the first three letters with a '.'.  Following this will be a mandatory ':'.  Finally,
 * all custom days on which the this promo shalt appear will be formatted as new Date().toDateString strings
 * separated by ';'. It's pretty easy you goofus
 */
export function isTodayInDates(dates) {
    const firstParse = dates.split(':');
    const date = new Date().toDateString();
    if (firstParse[0] !== '') {
        const day = date.split(' ')[0];
        const dailyRepeats = firstParse[0].split('.');
        for (let i = 0; i < dailyRepeats.length; i++) {
            if (dailyRepeats[i] === day) {
                return true;
            }
        }
    }
    const customDays = firstParse[1].split(';');
    for (let j = 0; j < customDays.length; j++) {
        if (customDays[j] === date) {
            return true;
        }
    }
    return false;
}

