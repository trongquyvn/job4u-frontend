const windowScreen =
    typeof window !== 'undefined' && window.innerWidth > 0
        ? window.innerWidth
        : typeof screen !== 'undefined'
        ? screen.width
        : 0;

export { windowScreen };
