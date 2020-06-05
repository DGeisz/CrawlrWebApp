/**
 * Takes in a military block time i.e. '12:20;14:30' and
 * output the standard interval it represents, ie '12:20 PM - 2:30 PM
 */
export function militaryBlockToStandardInterval(militaryBlock) {
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
        if (days[dayArray[i - 1]] + 1 === days[dayArray[i]]) {
            dayCluster[clusterIndex].push(dayArray[i]);
        } else {
            dayCluster.push([dayArray[i]]);
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