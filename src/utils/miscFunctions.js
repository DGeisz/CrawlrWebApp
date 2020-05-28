
/*This takes in a number, and outputs the number in a 3-4 character format, like 3.4k, or 1.2m*/
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
