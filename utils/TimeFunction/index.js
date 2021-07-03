export const getTimeDifference = (datetime) => {
    let current = new Date();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - datetime;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
};

export const dateFilter = () => {
    const now = new Date().getTime();
    const _one = 86400000;
    return [
        { start: now - _one, end: now, label: '24 hours' },
        { start: now - _one * 3, end: now, label: '3 days' },
        { start: now - _one * 7, end: now, label: '7 days' },
        { start: now - _one * 30, end: now, label: '30 days' },
        { start: 0, end: now, label: 'All' },
    ];
};
