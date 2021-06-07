const countries = [
    {
        code: 'vn',
        name: 'Vietnam',
    },
    {
        code: 'us',
        name: 'United States',
    },
    {
        code: 'au',
        name: 'Australia',
    },
    {
        code: 'ge',
        name: 'Germany',
    },
    {
        code: 'jp',
        name: 'Japan',
    },
    {
        code: 'cz',
        name: 'Czech Republic',
    },
    {
        code: 'ch',
        name: 'Switzerland',
    },
    {
        code: 'kr',
        name: 'Republic of Korea',
    },
    {
        code: 'hk',
        name: 'Hong Kong',
    },
    {
        code: 'sg',
        name: 'Singapore',
    },
    {
        code: 'my',
        name: 'Malaysia',
    },
    {
        code: 'fr',
        name: 'France',
    },
    {
        code: 'it',
        name: 'Italy',
    },
    {
        code: 'dk',
        name: 'Denmark',
    },
    {
        code: 'be',
        name: 'Belgium',
    },
    {
        code: 'no',
        name: 'Norway',
    },
];

export const getCountryCodeByName = (name) => {
    if (Array.isArray(name)) name = name[0];
    const country = countries.find((x) => x.name === name);
    if (typeof country !== 'undefined') return country;
    return {
        code: 'vn',
        name: 'vietnam',
    };
};
