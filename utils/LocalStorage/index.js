export const getCache = function (key) {
    if (typeof window !== 'undefined') {
        const value = window.localStorage.getItem(key);
        return value ? value : '';
    }
    return '';
};

export const setCache = function (key, value) {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
    }
};
