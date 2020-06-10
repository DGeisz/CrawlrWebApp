export function currentEmoji(emojiCount) {
    let max = Math.max(...emojiCount.live);
    if (max !== 0) {
        console.log("Fun: ", emojiCount.live.indexOf(emojiCount.live));
        return [emojiCount.live.indexOf(max), 0];
    }

    max = Math.max(...emojiCount.day);
    if (max !== 0) {
        return [emojiCount.day.indexOf(max), 1];
    }

    max = Math.max(...emojiCount.week);
    if (max !== 0) {
        return [emojiCount.week.indexOf(max), 2];
    }

    return [emojiCount.allTime.indexOf(Math.max(...emojiCount.allTime)), 3];
}