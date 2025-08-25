// data.js
export const rawData = {
    Airtel: 25,
    Jio: 25,
    VI: 5,
    BSNL: 10,
    Synch: 0,
    "Text Local": 15,
    Equance: 10,
    Infobip: 10,
};

export const data = Object.entries(rawData)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));
